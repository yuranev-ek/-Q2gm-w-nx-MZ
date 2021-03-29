<template>
  <div class="w-full py-4">
    <div class="pb-4 flex">
      <base-input
        v-model="filter.value"
        :placeholder="filter.placeholder"
        class="w-full"
      />
      <button
        class="ml-3 bg-blue-700 text-white border border-blue-700 font-bold py-3 px-5 rounded-lg"
      >
        {{ filter.placeholder }}
      </button>
    </div>
    <div class="relative overflow-auto">
      <table class="table w-full border-collapse">
        <thead>
          <tr>
            <template v-for="(col, colIndex) of columns">
              <th
                v-if="col.visible"
                @click="onClickSort(col.key)"
                :key="`col-${colIndex}`"
                class="table__th relative p-3 font-bold uppercase text-sm border-b cursor-pointer bg-gray-200 whitespace-nowrap"
              >
                <div class="flex items-center">
                  <span>{{ col.label }}</span>
                  <i
                    :class="defineSortClass(col.key)"
                    class="arrow right-5"
                  ></i>
                </div>
              </th>
            </template>
          </tr>
        </thead>
        <tbody>
          <tr
            class="cursor-pointer hover:bg-gray-100"
            v-for="(row, rowIndex) of paginatedRows"
            :key="`row-${rowIndex}`"
          >
            <template v-for="(td, tdIndex) of columns">
              <td :key="`td-${tdIndex}`" v-if="td.visible" class="p-3 border-b">
                {{ row[td.key] }}
              </td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>

    <base-pagination
      v-if="pagesNumber"
      :pagesNumber="pagesNumber"
      :page="pagination.page"
      @on-change-page="setPage"
    />
  </div>
</template>

<script>
// todo: throttle: filter
// todo: apply filter after click button
import BasePagination from "@/components/BasePagination.vue";
import BaseInput from "@/components/BaseInput.vue";
export default {
  name: "BaseTable",
  components: {
    BaseInput,
    BasePagination,
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
    pagesNumber() {
      return Math.ceil(this.filterRows().length / this.pagination.rowsPerPage);
    },
    endIndexPaginate() {
      return this.pagination.rowsPerPage * this.pagination.page;
    },
    startIndexPaginate() {
      return this.endIndexPaginate - this.pagination.rowsPerPage;
    },

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
    paginatedRows() {
      return this.filterRows().slice(
        this.startIndexPaginate,
        this.endIndexPaginate
      );
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
      pagination: {
        rowsPerPage: 50,
        page: 1,
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
    setPage(page = 1) {
      this.pagination.page = page;
    },
    defineSortClass(key) {
      return this.sort.key === key ? `arrow--${this.sort.direction}` : "";
    },
    filterRows() {
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
  watch: {
    sortedRows: {
      deep: true,
      handler() {
        this.setPage(1);
      },
    },
    "filter.value"() {
      this.setPage(1);
    },
  },
};
</script>

<style>
.arrow {
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

.arrow--desc,
.arrow--asc {
  opacity: 1;
}

.arrow--desc {
  transform: rotate(-180deg);
}

.table__th:hover .arrow {
  opacity: 0.5;
}
</style>
