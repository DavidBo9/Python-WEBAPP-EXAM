import React from 'react'

export const Landing = ({page}) => {
  return (
    <>
        <div className="bg-gray-100">
            <div className="min-h-screen flex items-center justify-center">
                <img src="/public/game-control.ico" className="items-center mb-8 w-60" alt="" />
                <div className="max-w-2xl w-full px-4">
                    <h1 className="text-4xl font-bold text-center mb-8">Welcome to PIRATE STEAM!</h1>
                    <h1 className="text-4xl font-bold text-center mb-8">API GitHub Repo: https://github.com/DavidBo9/Python-Exam</h1>
                    <h1 className="text-4xl font-bold text-center mb-8">React WebApp GitHub Repo: https://github.com/DavidBo9/Python-WEBAPP-EXAM</h1>
                    <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                        <button onClick={() => page(3)} className="bg-black hover:bg-gray-700 text-white py-2 px-8 border rounded-full">Get started</button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
