<template>
  <div class="w-full relative overflow-auto">
    <table class="w-full border-collapse">
      <thead>
        <tr>
          <template v-for="(col, colIndex) of columns">
            <th
              class="py-4 px-6 font-bold uppercase text-sm border-b cursor-pointer bg-gray-200 whitespace-nowrap"
              :key="`col-${colIndex}`"
              v-if="col.visible"
            >
              <div class="flex items-center">
                <span>{{ col.label }}</span>
                <i class="sort"></i>
              </div>
            </th>
          </template>
        </tr>
      </thead>
      <tbody>
        <tr
          class="cursor-pointer hover:bg-gray-100"
          v-for="(row, rowIndex) of rows"
          :key="`row-${rowIndex}`"
        >
          <template v-for="(td, tdIndex) of columns">
            <td
              :key="`td-${tdIndex}`"
              v-if="td.visible"
              class="py-4 px-6 border-b"
            >
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

<style>
.sort {
  display: none;
  width: 0;
  height: 0;
  margin: 4px 4px 0 3px;

  background: transparent;
  border: solid 5px transparent;
  border-bottom: solid 7px #f80;
  border-top-width: 0;
  transition: all 0.25s ease-in-out;
}

.sort--desc,
.sort--asc {
  display: inline-block;
}

.sort--desc {
  transform: rotate(-180deg);
}
</style>
