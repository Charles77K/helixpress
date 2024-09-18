export default function Header({ headText, btnText, logoText }) {
  return (
    <div className="bg-gradient-to-r from-blue-900 to bg-blue-600 h-60 w-full flex justify-between px-8 items-center">
      <section className="flex gap-16 flex-col items-start">
        <p className="text-stone-100 text-[40px]">{headText}</p>
        <button className="border-none w-32 px-3 py-2 rounded-3xl bg-white text-slate-800 hover:text-blue-600 transition-scale ease-in-out duration-300">
          {btnText}
        </button>
      </section>
      <section className="h-48 w-48 rounded-full bg-yellow-300 hidden md:flex justify-center items-center">
        <h2 className="text-center text-2xl">{logoText}</h2>
      </section>
    </div>
  );
}
