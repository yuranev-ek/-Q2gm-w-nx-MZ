<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  height: 100%;
  scroll-behavior: smooth;
}

body {
  display: flex;
  flex-direction: column;

  height: 100%;
  margin: 0;
  padding: 0;

  font-family: "Roboto", "Open Sans", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
}

ul {
  padding: 0;
  margin: 0;

  list-style: none;
}

a {
  color: inherit;
  text-decoration: none;

  transition: all 0.25s ease-in-out;
}

img {
  display: block;

  max-width: 100%;
  height: auto;
}

p {
  margin: 0;
  padding: 0;
}
</style>
