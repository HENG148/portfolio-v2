import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}
interface State {
  hasError: boolean;
}

export class AboutSectionBounary extends Component<Props, State>{
  state: State = { hasError: false };
  static getDerivedStateFormError(): State{
    return { hasError: true };
  }
  componentDidCatch(err: Error) {
    console.error("[Aboutsection]", err);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section id="about" className="max-w-7xl mx-auto py-20 px6 md:px-10 text-center">
          <p className="text-zinc-500 text-sm">This section couldn't load right now.</p>
        </section>
      )
    }
    return this.props.children;
  }
}