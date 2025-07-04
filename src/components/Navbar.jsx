import Button from "./Button";

const Navbar = ({ onLoginClick, onSignupClick }) => {
  return (
    <nav className="w-full flex justify-between items-center px-8 py-4 bg-black text-white font-medium">
      <div className="text-yellow-400 text-xl font-semibold">Resumind</div>

      <ul className="flex space-x-6">
        <li className="hover:text-yellow-400 cursor-pointer">features</li>
        <li className="hover:text-yellow-400 cursor-pointer">pricing</li>
        <li className="hover:text-yellow-400 cursor-pointer">download</li>
      </ul>

      <div className="flex space-x-4">
        <Button onClick={onLoginClick}>Login</Button>
        <Button onClick={onSignupClick}>Sign Up</Button>
      </div>
    </nav>
  );
};

export default Navbar;
