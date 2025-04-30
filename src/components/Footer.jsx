import logo from "../assets/logo.jpg"


const Footer = () => {
  return (
    <>
      <footer className="bg-[#18181a] text-[#f9f6e8] relative z-112 min-h-svh">
        <div className="flex flex-col md:flex-row justify-around p-4 border-b border-zinc-700 mb-10">
          <div className="flex justify-between items-center font-bold text-3xl py-4">
            Yaswanth Pulavarthi
          </div>
          <div className="flex space-x-4 max-w-full">
            <a className="flex items-center space-x-1" href="#">
              <i className="fab fa-linkedin"></i>
              <span>LinkedIn</span>
            </a>
            <a className="flex items-center space-x-1" href="#">
              <i className="fab fa-github"></i>
              <span>Github</span>
            </a>
            <a className="flex items-center space-x-1" href="#">
              <i className="fab fa-twitter"></i>
              <span>(X) Twitter</span>
            </a>
          </div>
        </div>

        <main className="flex flex-col md:flex-row justify-evenly items-center w-full">
          <nav className="flex flex-col space-y-12 text-3xl font-medium tracking-wide items-center">
            <a className="hover:underline" href="#">
              Projects
            </a>
            <a className="hover:underline" href="#">
              About
            </a>
            <a className="hover:underline" href="#">
              Contact
            </a>
            <div className="mt-auto w-28">
              <img
                alt="image"
                className="w-28 h-28 object-contain rounded-full"
                src={logo}
              />
            </div>
          </nav>
          <section className="flex flex-col justify-around md:h-96 p-8 text-base leading-relaxed tracking-wide">
            <div className="max-w-xl">
              <p className="mb-6">Do you have any project ideas in your mind?</p>
              <p className="mb-6">
                Let’s connect.
                <a className="underline" href="mailto:example@domain.com">
                  example@domain.com
                </a>
              </p>
            </div>
            <form className="max-w-xl flex flex-col space-y-4">
              <label className="flex items-center space-x-2 text-xs font-semibold tracking-widest">
                <div className="w-3 h-3 rounded-full bg-[#f9f6e8]"></div>
                <span>STAY IN TOUCH</span>
              </label>
              <div className="flex items-center border-b border-[#f9f6e8]">
                <input
                  className="bg-transparent flex-grow text-[#f9f6e8] placeholder-[#f9f6e8] text-base font-normal outline-none py-1"
                  placeholder="Email address"
                  type="email"
                />
                <button
                  aria-label="Submit email"
                  className="text-[#f9f6e8] text-2xl pl-4"
                  type="submit"
                >
                  <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </form>
          </section>
        </main>
        <div className="py-8 text-center">
          <p className="text-gray-400">
            © Copyright 2025 Make in India. All Rights Reserved
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
