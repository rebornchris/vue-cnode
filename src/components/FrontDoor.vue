<template>
<div class="door-wrap">
  <div class="door__row">
    <div class="door__logo">
      <img style="border-radius:50%" src="../assets/logo2.jpg" alt="logo">
    </div>
    <div class="door__loader">
      <CircleLoading :circleStatus="circleState" @loaded="loaded"></CircleLoading>
    </div>
  </div>
</div>
</template>

<script>
import Tools from '../conf/tools';
import CircleLoading from './Loading';

export default {
  data() {
    return {
      animated: false,
      circleState: '',
      animEventName: ''
    };
  },
  components: {
    CircleLoading
  },
  props: {
    state: {
      type: String,
      default: 'hide'
    }
  },
  watch: {
    state(newVal) {
      this.circleState = newVal;
    }
  },
  mounted() {
    this.animEventName = Tools.getAnimEventName();

    const endAnimation = () => {
      if (this.animEventName) {
        this.$el.removeEventListener(this.animEventName, endAnimation);
      }

      this.$emit('ready');
    };

    this.$el.classList.add('loading');

    if (this.animEventName) {
      this.$el.addEventListener(this.animEventName, endAnimation, false);
    } else {
      endAnimation();
    }
  },
  methods: {
    loaded() {
      this.$el.classList.remove('loading');
      this.$el.classList.add('loaded');
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.door-wrap {
    position: fixed;
    top: 0;
    left: 0;
    display: table;
    width: 100%;
    height: 100%;
    background: #fff;
    z-index: 1002;

    &.loaded,
    &.loading {
        .door__loader,
        .door__logo {
            opacity: 1;
        }

        .door__loader {
            animation-delay: 0.2s;
        }
    }

    &.loading {
        .door__loader,
        .door__logo {
            animation: initialAnim 1s cubic-bezier(0.7,0,0.3,1) both;
        }
    }

    &.loaded {
        animation: loadedWrapAnim 1s cubic-bezier(0.7,0,0.3,1) forwards;

        .door__loader,
        .door__logo {
            animation: loadedAnim 0.5s cubic-bezier(0.7,0,0.3,1) forwards;
        }
    }
}

.door {
    &__row {
        display: table-cell;
        text-align: center;
        vertical-align: middle;
    }

    &__loader,
    &__logo {
        opacity: 0;
    }

    &__loader {
        margin-top: 2rem;
        animation-delay: 0.2s;
    }
}
@keyframes initialAnim {
    from {
        opacity: 0;
        transform: translate3d(0,800px,0);
    }
}
@keyframes loadedAnim {
    to {
        opacity: 0;
        transform: translate3d(0,-100%,0) scale3d(0.3,0.3,1);
    }
}
@keyframes loadedWrapAnim {
    to {
        transform: translate3d(0,-100%,0);
    }
}
</style>
