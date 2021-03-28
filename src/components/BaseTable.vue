<template>
  <div>
    <table class="table-fixed w-full">
      <thead>
        <tr>
          <template v-for="(col, colIndex) of columns">
            <th :key="`col-${colIndex}`" v-if="col.visible">
              {{ col.label }}
            </th>
          </template>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) of rows" :key="`row-${rowIndex}`">
          <template v-for="(td, tdIndex) of columns">
            <td :key="`td-${tdIndex}`" v-if="td.visible">
              {{ row[td.key] }}
            </td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "BaseTable",
  props: {
    columns: {
      type: Array,
      default() {
        return [];
      },
    },
    rows: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    visibleColumns() {
      return this.columns.filter((col) => col.visible).map((col) => col.key);
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
