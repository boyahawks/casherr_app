<template>
  <div class="home">
    <ListMenu />
  </div>
</template>

<script>
// @ is an alias to /src
import ListMenu from "@/components/ListMenu.vue";

export default {
  name: "ListMenuView",
  components: {
    ListMenu,
  },
};
</script>
