const { Client, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

// لما البوت يشتغل
client.once(Events.ClientReady, async () => {
    console.log(`Logged in as ${client.user.tag}`);

    // حطي هنا ID الشانيل اللي بدك يظهر فيه الزر
    const channel = client.channels.cache.get('1479977864572178433'); // استبدلي ID_OF_CHANNEL بالشانيل تبعك

    const button = new ButtonBuilder()
        .setCustomId('reservation')
        .setLabel('احجز الآن')
        .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder().addComponents(button);

    // البوت يرسل رسالة فيها الزر تلقائي
    await channel.send({ content: 'اضغطي على الزر لتأكيد الحجز:', components: [row] });
});

// لما أحد يضغط الزر
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isButton()) return;

    if (interaction.customId === 'reservation') {
        // رسالة في الشانيل تقول: [اسم الشخص] تم الحجز
        await interaction.channel.send(`${interaction.user.username} تم الحجز بنجاح! 🎉`);

        // رسالة خاصة للشخص اللي ضغط الزر
        await interaction.reply({ content: 'تم تسجيل حجزك!', ephemeral: true });
    }
});

// حطي الـ Token تبعك هنا
client.login('MTQ3OTk1ODk3NzI4MTUyNzkwOQ.GHLMmA.jArz1wd9ev3V0JlkI_PILiDMPIiAhHn0NhsBfs'); // استبدلي YOUR_BOT_TOKEN بالـ Token تبعك