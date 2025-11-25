Hooks.on('init', () => {
    game.settings.register('earthdawn-community-content', 'welcome', {
        name: 'Update News',
        hint: 'Show up a welcome message when the module is first installed or updated.',
        scope: 'world',
        type: Boolean,
        config: true,
        default: false
    });
});

Hooks.on('ready', async () => {
    if (game.settings.get('earthdawn-community-content', 'welcome') || !game.user.isGM) return;
    // Fetch the HTML file content
    const response = await fetch('modules/earthdawn-community-content/scripts/message.hbs');
    const htmlContent = await response.text();

    new Dialog({
        title: "Welcome to the Earthdawn Community content!",
        content: htmlContent,
        buttons: {
            ok: {
                label: "OK",
                callback: () => {}
            }
        },
        default: "ok"
    }).render(true);
    game.settings.set('earthdawn-community-content', 'welcome', true);
});