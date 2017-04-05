<template>
  <div class="hello">
      <p v-text="count"></p>
      <p v-text="countAlias"></p>
      <p v-text="localCountStr"></p>
      <p v-text="countPlusLocalState"></p>
      <ul>
        <li v-for="todo in doneTodos" v-text="todo.name"></li>
      </ul>
      <p v-text="doneTodosCount"></p>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
      <input type="text" v-model.number="localCount" />
      <button @click="addSpecificCount">+++</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import { INCREMENT_COUNT, DECREMENT_COUNT, ADD_SPECIFIC_COUNT } from '../consts/mutation';

export default {
  name: 'hello',
  data() {
    return {
      localCount: 2
    }
  },
  computed: {
    localCountStr() {
      return 'localCount: ' + this.localCount;
    },
    
    // 使用getters的时候注意一点是是从$store中获取的getters,而不是state
    // doneTodos() {
    //   return this.$store.getters.doneTodos;
    // },
    
    // 使用对象展开运算符将 getters 混入 computed 对象中
    ...mapGetters([
        'doneTodos',
        'doneTodosCount'
    ]),

    // ...mapGetters({
    //   // 映射 this.doneCount 为 store.getters.doneTodosCount
    //   doneCount: 'doneTodosCount'
    // })

    // 使用对象展开运算符可以将mapState返回的对象直接展开合并到组件本身的计算属性中
    ...mapState({

      // 直接将state中的count映射到当前组件中
      count: state => state.count,

      // 传递字符串count等价于 'state => state.count'
      countAlias: 'count',
      
      // 如果需要读取当前组件的本地状态,需要使用this指针,则只能使用常规的函数
      countPlusLocalState (state) {
        return state.count + this.localCount;
      },
    }) // ['count'] // 当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组。
  },
  methods: {
    // increment() {
    //   this.$store.commit(INCREMENT_COUNT);
    // },
    // decrement() {
    //   this.$store.commit(DECREMENT_COUNT);
    // },
    ...mapMutations({
      increment: INCREMENT_COUNT, // 映射 this.increment() 为 this.$store.commit('INCREMENT_COUNT')
      decrement: DECREMENT_COUNT
    }),

    addSpecificCount() {
      var me = this;
      this.$store.dispatch({
          type: ADD_SPECIFIC_COUNT,
          count: this.localCount
      }).then(function () {

          // 打印更新完成之后的数据
          console.log(me.countPlusLocalState);
      });
    }
  }
}
</script>

<style scoped>

</style>
