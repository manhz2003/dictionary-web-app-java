import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import path from "./ultils/path";

import {
  Profile,
  HomePage,
  VocabularyDetail,
  Riddle,
  ExploreWord,
  SearchResult,
  WordList,
} from "./pages/Client/index";

import { Register, Login, Forgot, Reset } from "./pages/Public";
import { LayoutClient, LayoutAdmin, NotFound } from "./components/index";

const router = createBrowserRouter([
  {
    path: path.HOME,
    element: <LayoutClient />,
    errorElement: <NotFound />,

    children: [
      {
        path: path.HOME,
        element: <HomePage />,
      },
      {
        path: path.PROFILE,
        element: <Profile />,
      },
      {
        path: path.VOCABULARY_DETAIL,
        element: <VocabularyDetail />,
      },
      {
        path: path.RIDDLE,
        element: <Riddle />,
      },
      {
        path: path.EXPLORE_WORD,
        element: <ExploreWord />,
      },
      {
        path: path.SEARCH_RESULT,
        element: <SearchResult />,
      },
      {
        path: path.WORD_LIST,
        element: <WordList />,
      },
    ],
  },

  {
    path: path.ADMIN,
    element: <LayoutAdmin />,
    errorElement: <NotFound />,

    children: [
      {
        path: path.PROFILE,
        element: <Profile />,
      },
    ],
  },

  { path: path.REGISTER, element: <Register /> },
  { path: path.LOGIN, element: <Login /> },
  { path: path.FORGOT, element: <Forgot /> },
  { path: path.RESET, element: <Reset /> },
]);

function App() {
  return (
    <>
      <div className="min-h-screen">
        <RouterProvider router={router} />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
