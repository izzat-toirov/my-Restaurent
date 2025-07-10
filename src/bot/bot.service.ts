import { Injectable } from '@nestjs/common';
import { Context, Start, Update, Command, Hears } from 'nestjs-telegraf';
import { Markup, Telegraf } from 'telegraf';
import { InjectBot } from 'nestjs-telegraf';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../users/entities/user.entity';

interface SessionData {
  email?: string;
  password?: string;
}

@Update()
@Injectable()
export class BotService {
  private userStates = new Map<number, string>();
  private sessions = new Map<number, SessionData>();

  private readonly CHANNEL_USERNAME = '@restaurent_ty_uz_bot';
  private readonly ADMIN_CHAT_ID = 6779915471;


  constructor(
    @InjectBot() private readonly bot: Telegraf<any>,
    @InjectModel(User) private userModel: typeof User,
  ) {
    this.setBotCommands();
  }

  private async setBotCommands() {
    await this.bot.telegram.setMyCommands([
      { command: 'start', description: 'Botni boshlash 🚀' },
    ]);
  }

  @Start()
  @Command('start')
  async onStart(@Context() ctx: any) {
    const userId = ctx.from.id;

    const isMember = await this.checkUserMembership(userId);

    if (!isMember) {
      await ctx.reply(
        `👋 Botdan foydalanish uchun quyidagi kanalga obuna bo'ling:`,
        Markup.inlineKeyboard([
          Markup.button.url('📢 Kanalga o‘tish', `https://t.me/${this.CHANNEL_USERNAME.replace('@', '')}`),
          Markup.button.callback('✅ Obuna bo‘ldim', 'check_subscription')
        ])
      );
    } else {
      await ctx.reply(
        '👋 Xush kelibsiz! Quyidagi komandalar orqali foydalaning:',
        Markup.keyboard([['🔐 Kirish']]).resize(),
      );
    }
  }

  @Hears('🔐 Kirish')
  async onLogin(@Context() ctx: any) {
    const userId = ctx.from.id;
    this.userStates.set(userId, 'login_email');
    this.sessions.set(userId, {});
    await ctx.reply('📧 Iltimos, emailingizni kiriting:');
  }

  @Hears(/.*/)
  async onText(@Context() ctx: any) {
    const userId = ctx.from.id;
    const text = ctx.message.text.trim();
    const state = this.userStates.get(userId);
    const session = this.sessions.get(userId) || {};

    switch (state) {
      case 'login_email':
        session.email = text;
        this.userStates.set(userId, 'login_password');
        await ctx.reply('🔑 Parolni kiriting:');
        break;

      case 'login_password':
        session.password = text;
        try {
          const user = await this.userModel.findOne({ where: { email: session.email } });
          if (!user) {
            await ctx.reply('❌ Email yoki parol noto‘g‘ri.');
            break;
          }

          const isPasswordValid = await bcrypt.compare(session.password!, user.password);
          if (isPasswordValid) {
            await ctx.reply(
              `✅ Tizimga kirdingiz!\n👤 Ism: ${user.full_name}\n🆔 UserID: ${user.id}`,
              Markup.removeKeyboard(),
            );
          } else {
            await ctx.reply('❌ Email yoki parol noto‘g‘ri.');
          }
        } catch (e) {
          console.error('Login error:', e);
          await ctx.reply('⚠️ Kirishda xatolik yuz berdi.');
        }
        this.userStates.delete(userId);
        break;

      default:
        await ctx.reply('ℹ️ Iltimos, 🔐 Kirish tugmasidan foydalaning yoki /start yozing.');
    }

    this.sessions.set(userId, session);
  }

  private async checkUserMembership(userId: number): Promise<boolean> {
    try {
      const res = await this.bot.telegram.getChatMember(this.CHANNEL_USERNAME, userId);
      return ['member', 'administrator', 'creator'].includes(res.status);
    } catch (e) {
      console.error('Check Membership Error:', e);
      return false;
    }
  }
}
