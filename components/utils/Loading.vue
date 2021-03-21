<template>
  <div class="main" v-if="type==='dialog'">
    <div class="spinner text-center">
      <v-icon id="loader" x-large color="primary" class="mb-4">mdi-loading</v-icon><br>
      <span class="primary--text">お待ちください</span>
    </div>
    <div class="back" />
  </div>
  <div class="indicator" v-else-if="type === 'indicator'">
    <v-progress-circular
      :size="50"
      color="primary"
      indeterminate
      class="circle"
    />
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'Loading',
  props: {
    type: {
      type: String,
      default: 'dialog',
    }
  },
})
</script>
<style lang="scss" scoped>
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9000;
  .spinner {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    z-index: 9100;
    width: 150px;
    height: 80px;
    #loader {
      -webkit-animation: spin 1s infinite linear;
      -moz-animation: spin 1s infinite linear;
      -ms-animation: spin 1s infinite linear;
      }

      @-webkit-keyframes spin {
        0% { -webkit-transform: rotate(0deg); opacity:1; }
        50%  { -webkit-transform: rotate(180deg); opacity: 1; }
        100%   { -webkit-transform: rotate(360deg); opacity:1; }
      }
      @-moz-keyframes spin    {
        0% { -moz-transform: rotate(0deg); opacity: 1; }
        50%  { -moz-transform: rotate(180deg); opacity: 1; }
        100%   { -moz-transform: rotate(360deg); opacity:1; }
      }
      @-ms-keyframes spin     {
        0% { -ms-transform: rotate(0deg); opacity: 1; }
        50%  { -ms-transform: rotate(180deg); opacity: 1; }
        100%   { -ms-transform: rotate(360deg); opacity:1; }
      }
  }
  .back {
    top: 0;
    width: 100vw;
    height: 100vh;
    opacity: 0.9;
    background-color: #{$main_blue_light};
  }
}
.indicator {
  position: relative;
  width: 100%;
  height: 100%;
  .circle {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
  }
}
</style>
