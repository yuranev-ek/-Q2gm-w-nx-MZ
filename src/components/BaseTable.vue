<template>
  <div class="w-full relative overflow-auto py-4">
    <div class="pb-4">
      <base-input v-model="filter.value" :placeholder="filter.placeholder" />
    </div>
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
// todo: throttle: filter
import BaseInput from "@/components/BaseInput.vue";
export default {
  name: "BaseTable",
  components: {
    BaseInput,
  },
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
    sortedRows() {
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
    filteredRows() {
      if (this.filter.value) {
        return this.sortedRows.filter((row) => {
          const dirtyValuesOfRow = JSON.stringify(Object.values(row));
          return (
            dirtyValuesOfRow
              .toLowerCase()
              .indexOf(this.filter.value.toLowerCase()) !== -1
          );
        });
      } else {
        return this.sortedRows;
      }
    },
  },
  data() {
    return {
      sort: {
        key: null,
        direction: "desc",
      },
      filter: {
        value: null,
        placeholder: "Search",
      },
    };
  },
  methods: {
    onClickSort(key) {
      if (this.sort.key === key) {
        this.sort.direction = this.sort.direction === "asc" ? "desc" : "asc";
      } else {
        this.sort.key = key;
        this.sort.direction = "desc";
      }
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
