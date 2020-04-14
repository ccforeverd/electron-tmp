
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class World extends Vue {
  render () {
    return <p>This is rendered via TSX</p>
  }
}
