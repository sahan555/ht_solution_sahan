import { useAppDispatch, useAppSelector } from "../Global/Redux/store";
import { useNavigate } from "react-router-dom";
import { clearAuthData } from "../Global/Redux/authSlice";
import MemoryGame from "../Components/Home/MemoryGame";

const Home = () => {
  const username = useAppSelector((state) => state.auth.username);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearAuthData());
    navigate("/login");
  };
  return (
    <>
      <main className="home-page">
        <section className="max-w-[1200px] mx-auto">
          <nav className="flex justify-between items-center py-1">
            <h1 className="capitalize">hi , {username?.toLowerCase()}</h1>
            <div className="btn-wrapper">
              <button onClick={handleLogout} className="btn-primary">
                Logout
              </button>
            </div>
          </nav>
          <MemoryGame />
        </section>
      </main>
    </>
  );
};

export default Home;
