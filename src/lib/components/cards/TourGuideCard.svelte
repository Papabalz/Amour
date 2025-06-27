
<script>
import { fade } from 'svelte/transition';

const tourGuideData = [
{
id: 1,
  userName: "Kenedy Bolo",
  title: "Professional & Experienced",
  bio: "With over 10 years of experience leading cultural and adventure tours across Tanzania and East Africa, Kenedy is your go-to guide for deep, insightful, and engaging travel experiences. Passionate about history and local traditions, he ensures every guest leaves with unforgettable memories and a true understanding of the places they visit.",
  sex: "Male",
  experience: "9 years",
  picture: "https://plus.unsplash.com/premium_photo-1683319786517-cee29230b0e1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGFmcmljYW4lMjBtYWxlJTIwdG91ciUyMGd1aWRlfGVufDB8fDB8fHww"
},
{
id: 2,
  userName: "Amina Bello",
  title: "Fun & Energetic",
  bio: "Amina brings energy, laughter, and a love for discovery to every tour. Whether hiking waterfalls, exploring local markets, or dancing to traditional beats, her tours are full of joy and authentic local vibes. Her friendly personality and storytelling skills make every moment exciting!",
  sex: "Female",
  experience: "8 years",
  picture: "https://plus.unsplash.com/premium_photo-1664910887005-031e2ac9c40b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGFmcmljYW4lMjBmZW1hbGUlMjB0b3VyJTIwZ3VpZGV8ZW58MHx8MHx8fDA%3D"
},
{
id: 3,
  userName: "Chinyere Eze",
  title: "Heritage & History Guide",
  bio: "Chinyere is a passionate historian and heritage tour guide, dedicated to preserving and sharing Nigeria’s rich cultural legacy. From ancient kingdoms to colonial landmarks, she takes you through time with compelling stories, historical facts, and hidden gems.",
  sex: "Female",
  experience: "5 years",
  picture: "https://images.unsplash.com/photo-1623362004345-ec72ea0144be?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YWZyaWNhbiUyMGZlbWFsZSUyMHRvdXIlMjBndWlkZXxlbnwwfHwwfHx8MA%3D%3D"
},{
id: 4,
  userName: " Peter Nwankwo",
  title: "Nature & Wildlife Specialist",
  bio: "Peter is a certified eco-tourism expert with a deep love for wildlife and nature. From savannah safaris to rainforest hikes, he specializes in nature tours that educate and inspire. His vast knowledge of flora and fauna and his calm demeanor make him a favorite among nature lovers.",
  sex: "Male",
  experience: "11 years",
  picture: "https://media.istockphoto.com/id/2161352965/photo/young-togolese-man-is-looking-at-camera.webp?a=1&b=1&s=612x612&w=0&k=20&c=5BQd-RVQy23bnmYFnmAPrGGvAQKD6eFUudRFfPAXT9s="
},
{
id: 5,
  userName: "Tunde Lawal",
  title: "Youth & Adventure Specialist",
  bio: "Tunde leads adventure-packed tours for young travelers and thrill-seekers. Whether it’s kayaking, hiking, zip-lining, or exploring off-the-beaten paths, he delivers adrenaline-filled experiences with safety and fun at the forefront. He’s also great with student and youth groups!",
  sex: "Male",
  experience: "7 years",
  picture: "https://images.unsplash.com/photo-1557040640-9ae9fb23e085?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGFmcmljYW4lMjBtYWxlJTIwdG91ciUyMGd1aWRlfGVufDB8fDB8fHww"
},
{
id: 6,
  userName: "Fatima Hassan",
  title: "Multilingual & International",
  bio: "Fluent in English, French, and Hausa, Fatima specializes in guiding international tourists around Nigeria’s top destinations. With her warm hospitality and cross-cultural communication skills, she bridges cultural gaps and helps travelers feel at home while exploring something new.",
  sex: "Female",
  experience: "6 years",
  picture: "https://media.istockphoto.com/id/2177650491/photo/portraits-of-a-young-black-woman-with-yellow-dress-outdoors.webp?a=1&b=1&s=612x612&w=0&k=20&c=8CA9vcQ1XbHQJT2B7e7wufpffe28X-L74O30AHBKJXY="
}
];

/** @type {TourGuide | null} */
let selectProfile = null;

/** @typedef {{
  id: number;
  userName: string;
  title: string;
  bio: string;
  sex: string;
  experience: string;
  picture: string;
}} TourGuide */

const openModal = (/** @type {TourGuide} */ data) => {
  selectProfile = data;
          const modal = document.getElementById('my_modal_1');
          if (modal && modal instanceof HTMLDialogElement) modal.showModal();
}

</script>

<div class="mt-[5%] px-[2%] md:px-[5%] w-full h-full">
  <h3 class="mb-4 font-bold text-xl">Meet Our Tour Guides</h3>
    <div class="scrollbar-hidden md:grid md:grid-cols-3 gap-2 md:gap-4 max-md:flex md:h-auto md:w-full  h-80 flex max-md:overflow-auto">
{#each tourGuideData as data (data.id)}
  <div class="card bg-base-100 md:w-full  lg:h-86 md:h-72 shadow-sm w-52 h-70">
    <figure>
      <img
        src={data.picture}
        alt={data.userName} class="w-max-md:52" />
        
    </figure>
    <div class="card-body py-3 m-0 max-md:w-52 ">
      <h2 class="card-title max-md:text-sm">{data.userName}</h2>
      <!-- <p>{data.title}</p> -->
      <p class="max-md:text-xs">{data.bio.slice(0, 60)}...</p>
      <div class="card-actions justify-end">
        <button on:click={() => openModal(data)} class="btn btn-sm btn-primary m-0">View Profile</button>
      </div>
    </div>
  </div>
{/each}
</div>
{#if selectProfile}
<dialog id="my_modal_1" class="modal">
  <div transition:fade class="modal-box">
    <h3 class="font-bold text-lg">{selectProfile?.userName}</h3>
    <p class="py-4 font-semibold">{selectProfile?.experience} experience</p>
    <p>{selectProfile?.bio}</p>
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