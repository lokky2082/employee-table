<template>
 <div class="user-info">
    <div class="user-info__image" >
      <div class="user-info__avatar-place" v-if="imgLoading"></div>
      <img ref="avatar" @error="replaceAvatar" loading="lazy" @load="onImgLoad" :src="user.avatar" :alt="user.name"/>
    </div>
    <div class="user-info__name">
      {{user.name}}
    </div>
    <div class="user-info__mail">
      {{user.mail}}
    </div>
 </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { User } from '../api/types'

export default defineComponent({
  name: 'UserInfo',
  props: {
    user: {
      type: Object as PropType<User>,
      required: true
    }
  },
  data () {
    return {
      imgLoading: true
    }
  },
  methods: {
    onImgLoad() {
      this.imgLoading = false
    },
    replaceAvatar () {
      this.imgLoading = true
      const img = this.$refs.avatar as HTMLElement
      img.style.display = 'none'
    }
  }
});
</script>

<style scoped>
  .user-info {
    --avatar-size: 50px;
    --avatar-back: var(--sceleton-color);
    display: grid;
    grid-template-columns: var(--avatar-size) max-content;
    grid-template-rows: min-content min-content;
    justify-items: start;
    align-items: end;
    column-gap: 15px;
  }
  .user-info__image {
    width: var(--avatar-size);
    height: var(--avatar-size);
    border-radius: 50%;
    position: relative;
    overflow: hidden;
    grid-row-start: 1;
    grid-row-end: span 2;
  }
  .user-info__image img {
    position: absolute;
    width: 110%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

  }
  .user-info__avatar-place {
    position: absolute;
    width: var(--avatar-size);
    height: var(--avatar-size);
    border-radius: 50%;
    background: var(--avatar-back);
  }
  .user-info__mail {
    font-size: 0.85rem;
  }
</style>