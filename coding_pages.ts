import { publish } from "gh-pages"
(() => {
    publish("public",
        {
            repo:"git@e.coding.net:studio2401/zsh2401-blog/dist.git"
        }, (err) => {
            if (err) {
                console.log(err);
            }
        });
})();
