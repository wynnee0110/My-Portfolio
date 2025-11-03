export default function Contact() {
  return (
    <main
      className="min-h-screen text-white 
                 bg-[radial-gradient(circle_at_center,_#8F8581,_#3D3D3D,_#0D0C0C)]
                 flex flex-col items-center justify-center"
    >
      {/* Hero Image Full Width */}
      <div
        className="w-[90%] h-[80vh] bg-[url('/images/bg.jpg')] bg-cover bg-center bg-no-repeat"
      >
     
        {/* Text on top of image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold"></h1>
        </div>
      </div>
    </main>
  );
}
