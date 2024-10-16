<template>
    <div class="row text-center">
        <nav aria-label="Page navigation" v-if="totalPages>1">
            <ul class="pagination pagination-lg justify-content-center">
                <li class="page-item">
                    <button
                        class="page-link" 
                        type="button"
                        @click="onClickFirstPage"
                        :disabled="isInFirstPage"
                        >
                        <span aria-hidden="true">&lt;&lt;</span>
                        <span class="sr-only">First</span>
                    </button>

                </li>
                <li class="page-item">
                    <button
                        class="page-link" 
                        type="button"
                        @click="onClickPreviousPage"
                        :disabled="isInFirstPage"
                        >
                        <span aria-hidden="true">&lt;</span>
                        <span class="sr-only">Previous</span>
                    </button>

                </li>
                <li 
                    class="page-item"
                    v-for="page in totalPages"
                    :key="page"
                >
                    <button v-if="crPg > page-2 && crPg < page+2"
                    class="page-link"
                    type="button"
                    :class="crPg === page? 'active':''"
                    @click="onClickPage(page)"
                    :disabled="crPg === page"
                    >
                    {{ page }}
                    </button>
                    <button v-else-if="page<3 || page>totalPages-2"
                    class="page-link"
                    type="button"
                    :class="crPg === page? 'active':''"
                    @click="onClickPage(page)"
                    :disabled="crPg === page"
                    >
                    {{ page }}
                    </button>
                    <button v-else-if="(page==3 || page==totalPages-3)"
                    class="page-link"
                    :disabled="true"
                    >
                    ..
                    </button>

                </li>
                <li class="page-item">
                    <button
                    class="page-link"
                    type="button"
                    @click="onClickNextPage"
                    :disabled="isInLastPage"
                    >
                        <span aria-hidden="true">&gt;</span>
                        <span class="sr-only">Next</span>
                    </button>
                </li>
                <li class="page-item">
                    <button
                    class="page-link"
                    type="button"
                    @click="onClickLastPage"
                    :disabled="isInLastPage"
                    >
                        <span aria-hidden="true">&gt;&gt;</span>
                        <span class="sr-only">Last</span>
                    </button>
                </li>
            </ul>
        </nav>
    </div>
  </template>
  
  <script>
  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Pagination",
    data(){
        return {
            crPg:1
        }
    },
    computed: {
      isInFirstPage() {
        return this.crPg === 1;
      },
      isInLastPage() {
        return this.crPg === this.totalPages;
      },

    },
    props: ['totalPages','currentPage'],
    methods: {
      onClickFirstPage() {
        this.crPg = 1; 
        this.$emit('pagechanged', 1);
      },
      onClickPreviousPage() {
        this.crPg -= 1; 
        this.$emit('pagechanged', this.crPg - 1);
      },
      onClickPage(page) {
        this.crPg = page;
        this.$emit('pagechanged', page);
      },
      onClickNextPage() {
        this.crPg += 1;
        this.$emit('pagechanged', this.crPg + 1);
      },
      onClickLastPage() {
        this.crPg = this.totalPages;
        this.$emit('pagechanged', this.totalPages);
      },

    },
    created(){
        this.crPg = this.currentPage
    }
  }
  </script>
  <style>
  .pagination-item {
    display: inline-block;
  }
  
  .active {
    background-color: #4AAE9B!important;
    color: #ffffff!important;
  }
  </style>