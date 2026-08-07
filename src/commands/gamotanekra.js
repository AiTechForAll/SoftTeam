const {
    SlashCommandBuilder,
    PermissionFlagsBits
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("gamotanekra")
        .setDescription("💀 Μην το πατήσεις..."),

    async execute(interaction) {

        const member = interaction.member;

        // Owner προστασία
        if (interaction.guild.ownerId === member.id) {
            return interaction.reply({
                content: "👑 Είσαι ο owner, δεν γίνεται kick 😂",
                ephemeral: true
            });
        }

        // Admin προστασία
        if (member.permissions.has(PermissionFlagsBits.Administrator)) {
            return interaction.reply({
                content: "🛡️ Είσαι admin, δεν γίνεται kick 😂",
                ephemeral: true
            });
        }

        // DM πριν το kick
        try {
            await member.send(
                "💀 Είσαι χάστος που το έκανες αυτό AHAHAHAHA\n" +
                "Έφαγες kick επειδή πάτησες το /gamotanekra 🤣"
            );
        } catch (err) {
            console.log("Δεν στάλθηκε DM (κλειστά DMs)");
        }

        await interaction.reply({
            content: "💀 GAMOTANEKRA ενεργοποιήθηκε..."
        });

        // Kick τον ίδιο που το έγραψε
        await member.kick("Used /gamotanekra");
    }
};
