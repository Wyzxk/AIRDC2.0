import React from "react";

function Footer() {
  return (
    <>
      <footer className="bg-black">
        <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div>
              <img
                src="/Nav/faviconblack.png"
                className="mr-5 h-6 sm:h-9"
                alt="logoAIRDC"
              />
              <p className="max-w-xs mt-4 text-sm text-gray-600">
                <h1>AIRDC</h1> Es una empresa de venta de aires acondicionados
                automotrices, manten tu auto fresco con nosotros.
              </p>
              <div className="flex mt-8 space-x-6 text-gray-600">
                {/* Enlaces a redes sociales */}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-8 lg:col-span-2 sm:grid-cols-2 lg:grid-cols-4 pt-10">
              {/* Sección Acerca de AIRDC */}
              <div>
                <h1 className="font-medium">Acerca de AIRDC</h1>
                <nav className="flex flex-col mt-4 space-y-2 text-sm text-gray-500">
                  <a className="hover:opacity-75" href="/nosotros">
                    Nosotros
                  </a>
                </nav>
              </div>
              {/* Sección Dirección */}
              <div>
                <h1 className="font-medium">Dirección</h1>
                <nav className="flex flex-col mt-4 space-y-2 text-sm text-gray-500">
                  <a
                    className="hover:opacity-75"
                    target="__blank"
                    href="https://www.google.com/maps/place/Cl.+58+%2330-31,+Medell%C3%ADn,+Villa+Hermosa,+Medell%C3%ADn,+Antioquia/@6.2490296,-75.5530688,17z/data=!3m1!4b1!4m6!3m5!1s0x8e44288ab6eddec3:0x6c288d0739c26322!8m2!3d6.2490243!4d-75.5504939!16s%2Fg%2F11pwd0bzht?entry=ttu"
                  >
                    Calle 58 #30-31
                  </a>
                </nav>
              </div>
              {/* Sección WhatsApp */}
              <div>
                <h1 className="font-medium">WhatsApp</h1>
                <nav className="flex flex-col mt-4 space-y-2 text-sm text-gray-500">
                  <a className="hover:opacity-75" href="tel:+573025020202">
                    302-502-0202
                  </a>
                </nav>
              </div>
            </div>
          </div>
          <p className="mt-8 text-xs text-gray-800">© 2024 AIRDC</p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
