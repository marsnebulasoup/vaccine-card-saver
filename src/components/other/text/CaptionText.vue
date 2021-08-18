<script>
import { IonText } from "@ionic/vue";
export default {
  name: "CaptionText",
  render() {
    const El = this.inline ? "span" : "div";
    const fontSize = `font-size: ${this.size}${
      !isNaN(Number(this.size)) ? "px" : ""
    } !important;`;
    const wrapText = this.wrapText ? "white-space: break-spaces;" : "";
    return (
      <IonText color={this.color}>
        <El style={`${fontSize} ${wrapText}`} class="caption-text">
          {this.$slots.default()}
        </El>
      </IonText>
    );
  },
  props: {
    color: {
      type: String,
      default: "medium",
    },
    size: {
      type: [Number, String],
      default: 14,
    },
    wrapText: {
      type: Boolean,
      default: false,
    },
    inline: {
      type: Boolean,
      default: true,
    },
  },
  components: { IonText },
};
</script>

<style scoped>
.caption-text {
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 1.5px;
}
</style>