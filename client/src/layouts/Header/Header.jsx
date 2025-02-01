import Navbar from "../../components/Navbar/Navbar"

export default function Header(){
    return (
        <header className=" bg-(--dark-bg-secondary) text-(--dark-text-secondary)">
            <div className="container mx-auto flex justify-between items-center p-4">
                <img src="" alt="logo" />
                <Navbar />    
            </div>
        </header>
    )
}