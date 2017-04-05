import Vue from 'vue';
import Vuex from 'vuex';
import { INCREMENT_COUNT, DECREMENT_COUNT, ADD_SPECIFIC_COUNT } from '../consts/mutation';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        count: 0,
        name: '段刚强',
        todos: [
            {id: 1, name: 'learn Vue', done: true},
            {id: 2, name: 'learn Vuex', done: false},
            {id: 3, name: 'learn Vue router', done: true}
        ]
    },
    getters: {
        doneTodos: state => {
            return state.todos.filter(todo => todo.done);
        },

        // getters 作为第二个参数可以获取其他的getters作为当前的计算基础
        doneTodosCount: (state, getters) => {
            return getters.doneTodos.length;
        }
    },
    mutations: {
        [INCREMENT_COUNT](state) {
            state.count++;
        },
        [DECREMENT_COUNT](state) {
            state.count--;
        },
        [ADD_SPECIFIC_COUNT](state, payload) {
            state.count += payload.count;
        }
    },
    actions: {
        [ADD_SPECIFIC_COUNT](context, payload) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    context.commit(ADD_SPECIFIC_COUNT, payload);
                    resolve();
                }, 1000);
            });
        }
    }
});

export default store;