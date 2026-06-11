/* YT no almacena cookies de seguimiento hasta que el usuario interactúa con el vídeo */
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

        //autoplay=1: The video will play automatically when the iframe loads.
        //rel=0: Related videos will not be shown when playback ends.
        iframe.src = `${YOUTUBE_BASE_URL}/${videoId}?autoplay=1&rel=0`;

        iframe.title = embed.dataset.videoTitle ?? "Vídeo";

        /* clipboard-write: Copiar enlace
         * encrypted-media: Reproducir contenido protegido por DRM
         * picture-in-picture: Permitir modo imagen en imagen
         * web-share: Permitir compartir el vídeo
         */
        iframe.allow =
          "autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share";

        iframe.setAttribute("allowfullscreen", "");
        /* strict-origin-when-cross-origin: El navegador enviará la información de referencia solo a los sitios del mismo origen.*/
        iframe.referrerPolicy = "strict-origin-when-cross-origin";

        embed.replaceChildren(iframe);
      },
      // el listener solo se ejecuta una vez
      { once: true },
    );
  });
};

initVideoEmbeds();
