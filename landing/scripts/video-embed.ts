const YOUTUBE_BASE_URL = "https://www.youtube-nocookie.com/embed";

const initVideoEmbeds = (): void => {
  const embeds = document.querySelectorAll<HTMLElement>(".video-embed");

  embeds.forEach((embed) => {
    const button = embed.querySelector<HTMLButtonElement>(
      ".video-embed__button",
    );

    const videoId = embed.dataset.youtubeId;

    if (!button || !videoId) {
      return;
    }

    button.addEventListener(
      "click",
      () => {
        const iframe = document.createElement("iframe");

        iframe.src = `${YOUTUBE_BASE_URL}/${videoId}?autoplay=1&rel=0`;

        iframe.title = "Vídeo de presentación de OpositaTest";

        iframe.allow =
          "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

        iframe.setAttribute("allowfullscreen", "");

        embed.replaceChildren(iframe);
      },
      { once: true },
    );
  });
};

initVideoEmbeds();
