import "@ionic/vue";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import React from "react";
import ReactDOM from "react-dom";
import {
  createRoutesFromChildren,
  HashRouter,
  matchRoutes,
  useLocation,
  useNavigationType,
} from "react-router-dom";
import App from "./components/App";
import CodeInputProvider from "./components/providers/CodeInputProvider";
import { ErrorProvider } from "./components/providers/ErrorProvider";
import ThemeProvider from "./components/providers/ThemeProvider";
import { WormholeProvider } from "./components/providers/WormholeProvider";

Sentry.init({
  dsn: process.env["SENTRY_DSN"],
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.reactRouterV6Instrumentation(
        React.useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes
      ),
    }),
  ],
  tracesSampleRate: 1.0,
  release: process.env.RELEASE,
});

ReactDOM.render(
  <ErrorProvider>
    <CodeInputProvider>
      <WormholeProvider>
        <ThemeProvider>
          <HashRouter>
            <App />
          </HashRouter>
        </ThemeProvider>
      </WormholeProvider>
    </CodeInputProvider>
  </ErrorProvider>,
  document.querySelector("#app")
);
// import { render } from "react-dom";
// import { BrowserRouter, HashRouter } from "react-router-dom";
// import { Routes, Route, Link, useLocation } from "react-router-dom";
// import { TransitionGroup, CSSTransition } from "react-transition-group";
// import type { FC } from "react";
// import React from "react";
// import { useStyles } from "./hooks/useStyles";
// import ThemeProvider from "./components/providers/ThemeProvider";

// /** Helper Component to make a new page. */
// const Page: FC<React.PropsWithChildren<{ to: string }>> = (props) => <main><Link {...props} /></main>; // prettier-ignore

// /** Page A, see App for the URL */
// const A = () => <Page to="/b">You're on "/a": click to go to "/b"</Page>;
// /** Page B, see App for the URL */
// const B = () => <Page to="/a">Now on "/b": now click to go to "/a"</Page>;

// /** Start Demo Page, see App for the URL */
// const StartDemo = () => <Page to="/a">Click to start animated pages demo</Page>;

// function App() {
//   const location = useLocation();
//   const { classes } = useStyles();

//   return (
//     <TransitionGroup component={null}>
//       <CSSTransition
//         key={location.key}
//         classNames={{
//           enter: classes.fadeEnter,
//           enterActive: classes.fadeEnterActive,
//           exit: classes.fadeExit,
//           exitActive: classes.fadeExitActive,
//         }}
//         // classNames="fade"
//         timeout={300}
//       >
//         <Routes location={location}>
//           <Route path="/a" element={<A />} />
//           <Route path="/b" element={<B />} />
//           <Route path="*" element={<StartDemo />} />
//         </Routes>
//       </CSSTransition>
//     </TransitionGroup>
//   );
// }

// // Placed the context provider here so that <App/> can call useLocation()
// const Root = () => <HashRouter><ThemeProvider><App /></ThemeProvider></HashRouter>; // prettier-ignore

// render(<Root />, document.getElementById("app"));
