/* eslint-disable no-unused-vars */
import Vue from 'vue'
import Vuex from 'vuex'
import User from '@/models/User';
import News from '@/models/News';
import axios from "axios";
import Author from '@/models/Author';
const url = "http://localhost:3000"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isLoading: false,
        user: new User(),
        news: [],
        teamsDropdown: [],
        registerNews: new News(),
        loggedInUser: {},
        isUserLoggedIn: false,
        isLoadingRegister: false,
    },
    mutations: {
        SET_IS_LOADING(state, data) {
            state.isLoading = data;
        },
        SET_NEWS(state, data) {
            state.news = data
        },
        SET_LOGGED_USER(state, data) {
            delete data.password 
            state.loggedInUser = data;
        },
        INIT_REGISTERED_NEWS(state) {
            state.registerNews = new News()
        },
        INIT_USER(state) {
            state.user = new User();
        },
        SET_USER(state, data) {
            const user = new User();
            user.fromData(data);
            state.user = user;
        },
        SET_FIRST_NAME(state, data) {
            state.user.firstName = data;
        },
        SET_LAST_NAME(state, data) {
            state.user.lastName = data;
        },
        SET_USER_NAME(state, data) {
            state.user.userName = data;
        },
        SET_EMAIL(state, data) {
            state.user.email = data;
        },
        SET_TEAMS_DROPDOWN(state, data) {
            state.teamsDropdown = data;
        },
        SET_REGISTERED_NEWS_TITLE(state,data){
            state.registerNews.title = data;
        },
        SET_REGISTERED_NEWS_TEAM(state,data){
            const team = state.teamsDropdown.find(team => team.name === data)
            if(team){
                const { name, id } = team;
                state.registerNews.team = { name, id };
            }
        },
        SET_REGISTERED_NEWS_AUTHOR(state,data){
            const author = new Author()
            author.fromData(data)
            state.registerNews.author = author;
        },
        SET_REGISTERED_NEWS_TAGS(state,data){
            state.registerNews.tags = data;
        },
        SET_REGISTERED_NEWS_DESCRIPTION(state,data){
            state.registerNews.description = data;
        },
        SET_REGISTERED_NEWS_REMOVABLE(state,data){
            state.registerNews.removable = data;
        },
        SET_REGISTERED_NEWS_CONTENT(state,data){
            state.registerNews.content = data;
        },
        SET_REGISTER_NEWS(state, data) {
            state.registerNews = data;
        },
        SET_IS_LOGGED_IN(state) {
            state.isUserLoggedIn = true;
        },
        SET_IS_LOADING_REGISTER(state, data) {
            state.isLoadingRegister = data;
        },
        LOGOUT(state) {
            state.loggedInUser = {}
            state.isUserLoggedIn = false
            localStorage.removeItem("user");
          },
    },
    actions: {
        // eslint-disable-next-line no-unused-vars
        getUsers({ commit }, id) {
            commit('SET_IS_LOADING', true)
            return new Promise((resolve, reject) => {
                axios.get(`${url}/users`)
                    .then(response => {
                        if (response && response.data) {
                            commit('SET_IS_LOADING', false)
                        }
                        resolve(response)
                    })
                    .catch(error => { reject(error) })
            })
        },
        getUser({ commit }, id) {
            commit('SET_IS_LOADING', true)
            return new Promise((resolve, reject) => {
                axios.get(`${url}/users/${id}`)
                    .then(response => {
                        if (response && response.data) {
                            commit('SET_USER', response.data)
                            commit('SET_IS_LOADING', false)
                        }
                        resolve(response)
                    })
                    .catch(error => { reject(error) })
            })
        },
        getNews({ commit }) {
            commit('SET_IS_LOADING', true)
            return new Promise((resolve, reject) => {
                axios.get(`${url}/news`)
                    .then(response => {
                        if (response && response.data) {
                            commit('SET_NEWS', response.data)

                            commit('SET_IS_LOADING', false)
                        }
                        resolve(response)
                    })
                    .catch(error => { reject(error) })
            })
        },
        getNewsById({ commit }, id) {
            return new Promise((resolve, reject) => {
                axios.get(`${url}/news/${id}`)
                    .then(response => {
                        if (response && response.data) {
                            commit('SET_REGISTER_NEWS', response.data)
                        }
                        resolve(response)
                    })
                    .catch(error => { reject(error) })
                    .finally(() => {
                        commit('SET_IS_LOADING_REGISTER', false)
                    })
            })
        },
        getTeamsDropdownItems({ commit }) {
            commit('SET_IS_LOADING', true)
            return new Promise((resolve, reject) => {
                axios.get(`${url}/teams`)
                    .then(response => {
                        if (response && response.data) {
                            commit('SET_TEAMS_DROPDOWN', response.data)

                            commit('SET_IS_LOADING', false)
                        }
                        resolve(response)
                    })
                    .catch(error => { reject(error) })
            })
        },
        // eslint-disable-next-line no-unused-vars
        postNews({ commit, dispatch }, data) {
            return new Promise((resolve, reject) => {
                axios.post(`${url}/news`, data)
                    .then(response => {
                        if (response.data.success) {
                            console.log('response', response.data)
                        }
                        resolve(response)
                    })
                    .catch(error => { reject(error) })
                    .finally(() => commit('SET_IS_LOADING_REGISTER', false))
            })
        },
        putNews({ commit,dispatch }, data) {
            return new Promise((resolve, reject) => {
                axios.put(`${url}/news/${data.id}`, data)
                    .then(async response => {
                        if (response.data.success) {
                            console.log('response', response.data)
                        }
                        resolve(response)
                    })
                    .catch(error => { reject(error) })
                    .finally(() => commit('SET_IS_LOADING_REGISTER', false))
            })
        },
        // eslint-disable-next-line no-unused-vars
        registerUser({ commit }, data) {
            return new Promise((resolve, reject) => {
                axios.post(
                    `${url}/users`, data,
                ).then((response) => {
                    if (response && response.data) {
                        console.log(response.data);
                    }
                    resolve(response)
                }).catch((error) => {
                    reject(error)
                });
            });
        },
        getLoggedInUser({ commit }) {
            const reference = localStorage.getItem("user");
            if (reference) {
              commit("SET_LOGGED_USER", JSON.parse(reference));
              commit("SET_IS_LOGGED_IN", true);
            } else {
              commit("INIT_USER");
            }
          },
          deleteNews({ dispatch }, id) {
            return new Promise((resolve, reject) => {
              axios.delete(`${url}/news/${id}`).then((response) => {
                if (response && response.data) {
                    dispatch('getNews')
                }
                resolve(response);
              }).catch((error) => {
                reject(error);
              });
            });
          }
    },
    getters: {
        getUserNews: state => state.news.filter(n => n.author.id === state.user.id),
        teamOptions: state => state.teamsDropdown.map(n => n.name),
    }
})