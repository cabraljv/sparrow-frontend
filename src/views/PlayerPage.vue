<template>
  <div class="sparrow-player">
    <video id="player" class="player" ref="player" playsinline></video>
    <div class="controls">
      <div class="progress-bar">
        <input
          @change="updateProgressBar"
          v-model="progressBarSlider"
          type="range"
          class="progress"
          value="0"
          max="100"
          step="0.01"
        />
      </div>
      <div class="control-buttons">
        <button @click="togglePlay" class="control-item">
          <v-icon>
            {{ playing ? "mdi-pause" : "mdi-play" }}
          </v-icon>
        </button>
        <span class="control-item current-time">
          {{ videoProgressText }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import Hls from "hls.js";
import moviesApi from "@/services/moviesApi";

export default {
  name: "PlayerPage",
  data() {
    return {
      hls: null,
      playing: false,
      currentTime: 0,
      progressBarSlider: 0,
      duration: 0,
      totalDuration: 0,
    };
  },

  async mounted() {
    await this.fetchPlayerData();
    this.createPlayer();
  },

  beforeUnmount() {
    if (this.hls) {
      this.hls.destroy();
    }
  },

  methods: {
    createPlayer() {
      const video = this.$refs.player;
      const id = this.$route.params.id;
      const videoSrc = `http://localhost:3333/static/${id}/playlist.m3u8`;
      if (Hls.isSupported()) {
        const hls = new Hls();
        console.log("HLS supported");
        hls.on(Hls.Events.ERROR, function (event, data) {
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                console.log(
                  "fatal network error encountered, try to recover",
                  data,
                  event
                );
                hls.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                console.log(
                  "fatal media error encountered, try to recover",
                  data,
                  event
                );
                hls.recoverMediaError();
                break;
              default:
                console.log(
                  "fatal error encountered, try to recover",
                  data,
                  event
                );
                hls.startLoad();
                break;
            }
          }
        });
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
          console.log("manifest parsed", video);
        });

        video.addEventListener("timeupdate", this.timeUpdateEvent);
        hls.loadSource(videoSrc);
        hls.attachMedia(video);
        this.hls = hls;
      }
    },

    async fetchPlayerData() {
      const id = this.$route.params.id;
      const response = await moviesApi.getPlayerData(id);
      this.totalDuration = response.totalDuration;
    },
    updateProgressBar(e) {
      console.log("update progress bar", e.target.value);
      const newTime = (e.target.value / 100) * this.duration;
      this.updateVideoTime(newTime);
    },
    updateVideoTime(newTime) {
      if (!this.hls) return;
      this.hls.media.currentTime = newTime;
      this.currentTime = newTime;
    },
    timeUpdateEvent() {
      this.currentTime = this.hls.media.currentTime;
      this.duration = this.hls.media.duration;
      // update progressbar

      const videoPositionInPercent = (this.currentTime / this.duration) * 100;
      this.progressBarSlider = videoPositionInPercent;
      console.log("time update", this.currentTime, this.duration);
    },
    togglePlay() {
      const video = this.$refs.player;
      if (video.paused) {
        video.play();
        this.playing = true;
      } else {
        video.pause();
        this.playing = false;
      }
    },
  },
  computed: {
    videoProgressText() {
      // Calculate hours, minutes, and seconds for current time
      let hours = Math.floor(this.currentTime / 3600);
      let minutes = Math.floor((this.currentTime % 3600) / 60);
      let seconds = Math.floor(this.currentTime % 60);

      // Format hours, minutes, and seconds for current time
      hours = hours > 0 ? `${hours}:` : "";
      minutes = `${minutes < 10 ? `0${minutes}` : minutes}`;
      seconds = `${seconds < 10 ? `0${seconds}` : seconds}`;

      // Calculate hours, minutes, and seconds for total duration
      let totalHours = Math.floor(this.totalDuration / 3600);
      let totalMinutes = Math.floor((this.totalDuration % 3600) / 60);
      let totalSeconds = Math.floor(this.totalDuration % 60);

      // Format hours, minutes, and seconds for total duration
      totalHours = totalHours > 0 ? `${totalHours}:` : "";
      totalMinutes = `${totalMinutes < 10 ? `0${totalMinutes}` : totalMinutes}`;
      totalSeconds = `${totalSeconds < 10 ? `0${totalSeconds}` : totalSeconds}`;

      // Compose the formatted string
      return `${hours}${minutes}:${seconds} / ${totalHours}${totalMinutes}:${totalSeconds}`;
    },
  },
};
</script>

<style scoped>
#player {
  width: 100%;
  height: 100%;
}
.sparrow-player {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: black;
}
.controls {
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
  bottom: 0;
  left: 0;
}
.progress-bar {
  width: 100%;
  padding: 20px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
.progress {
  width: 100%;
}
.control-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  padding-top: 10px;
  color: white;
}
.current-time {
  margin-left: auto;
}
.control-item {
  padding: 5px;
  border-radius: 8%;
}
.control-item:hover {
  background: rgba(255, 255, 255, 0.1);
}
</style>
