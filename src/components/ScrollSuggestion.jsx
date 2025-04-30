import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const ScrollSuggestion = () => {
  return (
    <div className="absolute z-111 animate-[bounce_1s_ease-in-out_20] bottom-15 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2">
    <span className="text-sm uppercase tracking-widest select-none">Scroll Down</span>
    <div className="relative w-10 h-10 flex items-center justify-center">
      <span className="absolute w-10 h-10 rounded-full pulse-circle"></span>
        <FontAwesomeIcon
        icon={faChevronDown}
        className="text-3xl animate-[bounce_1s_ease-in-out_20] relative"
      />
    </div>
  </div>
      );
};

export default ScrollSuggestion;
