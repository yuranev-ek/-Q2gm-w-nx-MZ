<template>
  <div class="w-full relative overflow-auto">
    <table class="table w-full border-collapse">
      <thead>
        <tr>
          <template v-for="(col, colIndex) of columns">
            <th
              v-if="col.visible"
              @click="onClickSort(col.key)"
              :key="`col-${colIndex}`"
              class="table__th relative py-4 px-6 font-bold uppercase text-sm border-b cursor-pointer bg-gray-200 whitespace-nowrap"
            >
              <div class="flex items-center">
                <span>{{ col.label }}</span>
                <i :class="defineSortClass(col.key)" class="sort right-5"></i>
              </div>
            </th>
          </template>
        </tr>
      </thead>
      <tbody>
        <tr
          class="cursor-pointer hover:bg-gray-100"
          v-for="(row, rowIndex) of filteredRows"
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
    filteredRows() {
      if (this.sort.key) {
        const normalize = this.sort.direction === "asc" ? 1 : -1;
        const key = this.sort.key;

        return [...this.rows].sort((a, b) => {
          if (a[key] < b[key]) {
            return -1 * normalize;
          }

          if (a[key] > b[key]) {
            return 1 * normalize;
          }

          return 0;
        });
      } else {
        return this.rows;
      }
    },
  },
  data() {
    return {
      sort: {
        key: null,
        direction: "desc",
      },
    };
  },
  methods: {
    onClickSort(key) {
      this.sort.key = key;
      this.sort.direction = this.sort.direction === "asc" ? "desc" : "asc";
    },
    defineSortClass(key) {
      return this.sort.key === key ? `sort--${this.sort.direction}` : "";
    },
  },
};
</script>

<style>
.sort {
  position: absolute;
  right: 0;

  width: 0;
  height: 0;
  margin: 4px 4px 0 3px;

  background: transparent;
  border: solid 5px transparent;
  border-bottom: solid 7px;
  border-top-width: 0;
  transition: all 0.25s ease-in-out;
  opacity: 0;
}

.sort--desc,
.sort--asc {
  opacity: 1;
}

.sort--desc {
  transform: rotate(-180deg);
}

.table__th:hover .sort {
  opacity: 0.5;
}
</style>
