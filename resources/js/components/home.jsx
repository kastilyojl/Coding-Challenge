import React from "react";

function Home() {
    return (
        <div className="grid grid-rows-[60px-1fr]">
            <div className="bg-red-300 flex justify-end">
                <p>Guest</p>
                <span className="border-2 "></span>
                <p>Logout</p>
            </div>
            <div className="grid grid-cols-[400px_1fr] gap-6 h-screen">
                <div className="bg-blue-400 flex justify-center">
                    <div className="h-[160px] w-[160px] bg-violet-500 rounded-[100%]">
                        <img src="" alt="" />
                    </div>
                </div>
                <div className="bg-pink-300">summary</div>
            </div>
        </div>
    );
}

export default Home;
