import { useParams } from 'react-router-dom'
import { GoDependabot } from "react-icons/go";
import { IoSend } from "react-icons/io5";
import ProfileIcon from 'components/generic/ProfileIcon';
import ExistingChats from './components/ExistingChats';

const SpecificModel = () => {
    const { modelid } = useParams();

    // window.addEventListener("DOMContentLoaded", () => {
    //     const menuButton = document.getElementById('menuButton');
    //     const menuDropdown = document.getElementById('menuDropdown');
    //     menuButton.addEventListener('click', () => {
    //     if (menuDropdown.classList.contains('hidden')) {
    //         menuDropdown.classList.remove('hidden');
    //     } else {
    //         menuDropdown.classList.add('hidden');
    //     }
    //     });
        
    //     // Close the menu if you click outside of it
    //     document.addEventListener('click', (e) => {
    //     if (!menuDropdown.contains(e.target) && !menuButton.contains(e.target)) {
    //         menuDropdown.classList.add('hidden');
    //     }
    //     });
    // })
    
    return (
        <>
        <div className="flex h-screen overflow-hidden">
        <ExistingChats />
        
        <div className="flex-1">
            <div className="h-screen overflow-y-auto p-4 pb-36">
                {/* User Chat */}
                <div className="flex justify-end mb-10 cursor-pointer">
                    <div className="flex max-w-96 bg-green-500 text-white rounded-lg p-3 gap-3">
                        <p>Hi Alice! I'm good, just finished a great book. How about you?</p>
                    </div>
                    <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                        <ProfileIcon size={30} />
                    </div>
                </div>

                {/* Assistant Chat */}
                <div className="flex mb-10 cursor-pointer">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                        <GoDependabot className="w-8 h-8 rounded-full" />
                    </div>
                    <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                        <p className="text-gray-700">Hey Bob, how's it going?</p>
                    </div>
                </div>
            </div>
            
            <footer className="bg-white border-t border-gray-300 p-2 absolute bottom-0 w-3/4">
                <div className="flex items-center">
                    <input type="text" placeholder="Type a message..." className="token-input w-full p-2 rounded-md border-md border-green-400 focus:outline-none focus:border-green-500" />
                    <button className="bg-green-500 text-white px-3 py-2 rounded-md ml-2"><IoSend /></button>
                </div>
            </footer>
        </div>
    </div>
    </>
    )
}

export default SpecificModel