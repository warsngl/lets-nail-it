import firebase from 'firebase/app'

export default {
  actions: {
    async fetchRecords({dispatch, commit}) {
      try {
        const uid = await dispatch('getUid')
        const records = (await firebase.database().ref(`/iData/${uid}/records`).once('value')).val() || {}
        return Object.keys(records).map(key => ({...records[key], highlight:true}))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async createRecord({dispatch, commit},{record}){
      try {
        const uid=await dispatch('getUid')
        await firebase.database().ref(`/iData/${uid}/records`).push(record)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}