export default class GlobalDomEffect {
  static readonly EngAndNumberOnly = /\s|[^a-zA-Z0-9]/g;

  public static allInputAutoCompleteOff() {
    const allInputs = document.querySelectorAll("input");
    allInputs.forEach((input) => input.setAttribute("autocomplete", "off"));
  }
}
