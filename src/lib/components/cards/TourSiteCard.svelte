
<script lang="ts">
    import { fade } from 'svelte/transition';
    
    const tourAreaData = [
    {
    id: 1,
      name: "Serengeti National Park",
      details: "Serengeti National Park, in northern Tanzania, is known for its massive annual migration of wildebeest and zebra. Seeking new pasture, the herds move north from their breeding grounds in the grassy southern plains. Many cross the marshy western corridor’s crocodile-infested Grumeti River. Others veer northeast to the Lobo Hills, home to black eagles. Black rhinos inhabit the granite outcrops of the Moru Kopjes.",
      picture: "https://media.istockphoto.com/id/1136053333/photo/elephant-and-lion.webp?a=1&b=1&s=612x612&w=0&k=20&c=rGXhl00oROy53jzfH_yOelzPmlJBHkkNE8xvZ5BZPjg="
    },
    {
    id: 2,
      name: "Mount Kilimanjaro ",
      details: "Mount Kilimanjaro is a dormant volcano in Tanzania. It is the highest mountain in Africa and the highest free-standing mountain above sea level in the world, at 5,895 m above sea level and 4,900 m above its plateau base.",
      picture: "https://plus.unsplash.com/premium_photo-1664304370557-233bccc0ac85?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TW91bnQlMjBLaWxpbWFuamFyb3xlbnwwfHwwfHx8MA%3D%3D"
    },
    {
    id: 3,
      name: "Zanzibar Island",
      details: "Unguja, also known as Zanzibar Island, is the main island in the Tanzanian archipelago of Zanzibar. Stone Town, part of Zanzibar City, is an old trade center, with mosques and winding lanes. The 1883 House of Wonders is a former sultan’s palace with a clock tower. The Old Fort now houses a cultural center and a stone amphitheater. Underground aqueducts fed hot water to the late-19th-century Hamamni Persian Baths.",
      picture: "https://images.unsplash.com/photo-1711091704998-3bea86948c83?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fFphbnppYmFyJTIwSXNsYW5kfGVufDB8fDB8fHww"
    },{
    id: 4,
      name: "Ngorongoro Crater",
      details: "The Ngorongoro Crater is a breathtaking natural wonder located in Tanzania, famous for being the world's largest intact volcanic caldera and a UNESCO World Heritage Site. It's a focal point of the Ngorongoro Conservation Area, renowned for its incredible concentration of wildlife, including the Big Five (lions, elephants, buffalos, rhinos, and leopards",
      picture: "https://media.istockphoto.com/id/1196998582/photo/safari-vehicles-in-between-large-herds-of-animals-ngorongoro-crater-tanzania.webp?a=1&b=1&s=612x612&w=0&k=20&c=NxPZtigfAGjF_Ld3Qm04Md_hEBiCrdwXzdYi1P5OJLY="
    },
    {
    id: 5,
      name: "Tarangire National Park",
      details: "Tarangire National Park is a national park in Tanzania's Manyara Region. The name of the park originates from the Tarangire River that crosses the park. The Tarangire River is the primary source of fresh water for wild animals in the Tarangire Ecosystem during the annual dry season.",
      picture: "https://images.unsplash.com/photo-1707410437019-40c82e3a417f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8VGFyYW5naXJlJTIwTmF0aW9uYWwlMjBQYXJrfGVufDB8fDB8fHww"
    },
      {
    id: 6,
      name: "Nyerere National Park",
      details: "Nyerere National Park is a national park of Tanzania and is the largest national park in Tanzania and also one of the world's largest wildlife sanctuaries and national parks.",
      picture: "https://media.istockphoto.com/id/2175769062/photo/female-masai-giraffe-and-impala-in-nyerere-national-park-selous-game-reserve-in-southern.webp?a=1&b=1&s=612x612&w=0&k=20&c=7N7kln0Ielh1Gwev7H9lm0BVLqIAZNJQlaGU6Tq-tyk="
    },
    {
    id: 7,
      name: "Lake Manyara National Park ",
      details: "Lake Manyara National Park is a national park in Tanzania located between Lake Manyara and the Great Rift Valley in the Arusha and Manyara Regions. It is administered by the Tanzania National Parks Authority, and covers an area of 325 km² including about 230 km² lake surface",
      picture: "https://media.istockphoto.com/id/1224066657/photo/flying-flamingo-over-the-lake-manyara.webp?a=1&b=1&s=612x612&w=0&k=20&c=t0Sc7OfcJGE6xWKOeBtZyC0ePLdjdSYtWyuHnTLhFhA="
    },
      {
    id: 8,
      name: "Mafia Island",
      details: "Mafia Island is part of Tanzania's Mafia Archipelago, in the Indian Ocean. Large swaths of the island's southern coastline and surrounding waters are protected by the Mafia Island Marine Park. Within the park are many coral reefs, home to wildlife such as whale sharks and sea turtles. In the south, beaches include secluded Ras Kisimani, just across from Bwejuu Island. Popular Utende Beach edges onto Chole Bay.",
      picture: "https://images.unsplash.com/photo-1675843776560-b936ba1a931a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TWFmaWElMjBJc2xhbmR8ZW58MHx8MHx8fDA%3D"
    }
    ];

    let selectedSite: TourArea | null = null;

    type TourArea = {
      id: number;
      name: string;
      details: string;
      picture: string;
    };

    const openModal = (data: TourArea) => {
      selectedSite = data;
      const modal = document.getElementById('my_modal_2');
          if (modal && modal instanceof HTMLDialogElement) modal.showModal();

    }
    </script>
    
    <div class="mt-[3%] px-[2%] md:px-[5%] w-full h-full">
        <div>
            <h2 class="mb-4 font-bold text-xl">Why You Should Visit Tanzania</h2>
            <p class="mb-5 text-lg italic">Tanzania is one of Africa’s most captivating travel destinations — a land of breathtaking landscapes, incredible wildlife, rich cultures, and warm hospitality. Whether you're an adventure seeker, a nature lover, or a cultural explorer, Tanzania offers unforgettable experiences you won't find anywhere else.</p>
        </div>
      <h3 class="mb-4 font-bold text-xl">Top Areas To Visit</h3>
        <div class="scrollbar-hidden md:grid md:grid-cols-4 gap-2 md:gap-4 max-md:flex md:h-auto md:w-full  flex max-md:overflow-auto">
    {#each tourAreaData as data (data.id)}
      <div class="card bg-base-100 md:w-full  lg:h-70 md:h-60 shadow-sm w-52 h-56">
        <figure>
          <img
            src={data.picture}
            alt={data.name} class="w-max-md:52" />
            
        </figure>
        <div class="card-body py-3 m-0 max-md:w-52 ">
          <h2 class="card-title max-md:text-sm">{data.name}</h2>

          <div class="card-actions justify-end">
            <button on:click={() => openModal(data)} class="btn btn-sm btn-primary m-0">View</button>
          </div>
        </div>
      </div>
    {/each}
    </div>
    {#if selectedSite}
<dialog id="my_modal_2" class="modal">
  <div transition:fade class="modal-box">
    <h3 class="font-bold text-lg">{selectedSite?.name}</h3>
    <p class="mt-5">{selectedSite?.details}</p>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
{/if}
    </div>
    
    
    <style>
      /* styles.css or in component */
    .scrollbar-hidden {
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;     /* Firefox */
    }
    .scrollbar-hidden::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera */
    }
    </style>