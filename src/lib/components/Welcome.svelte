<script>
     import * as m from '$lib/paraglide/messages';
    function navigate() {
        // Replace with your navigation logic, e.g.:
        window.location.href = '/booking';
    }
</script>
<div class="welcome_bg ">
    <div class="welcome_container h-full w-full md:px-[5%] px-[2%] max-md:pb-5 relative">
    <h1 class="text-white font-bold text-2xl pt-5">Welcom to Amour!</h1>
    <button on:click={navigate} class="btn z-20 absolute md:right-[5%] top-[10%] right-[2%]">Booking</button>
     <div class="mt-[8%]">
        <h2 class="md:text-4xl sm:text-2xl text-lg font-bold  text-white text-center">Explore Zanzibar with us</h2>
        <p class="text-white max-md:text-sm mt-5 text-center">Let make your visit to Tanzania a memorable one, our experience tour guides are available to help.</p>
     </div>
     <div class="flex flex-row items-center justify-around mt-[10%]">
        <div class="flex flex-col items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 md:h-12 md:w-12" viewBox="0 0 14 14"><path fill="#ffffff" fill-rule="evenodd" d="M4.125 4.625a2.875 2.875 0 1 1 5.75 0v6c0 .46-.225.866-.572 1.116c-.252-.3-.63-.491-1.053-.491h-2.5a1.375 1.375 0 1 0 0 2.75h2.5c.62 0 1.145-.411 1.316-.976a2.63 2.63 0 0 0 1.559-2.399v-1h1.125c.898 0 1.625-.728 1.625-1.625V6c0-.897-.727-1.625-1.625-1.625h-.632a4.625 4.625 0 0 0-9.236 0H1.75C.853 4.375.125 5.103.125 6v2c0 .897.728 1.625 1.625 1.625H3.5c.345 0 .625-.28.625-.625zM1.375 6c0-.207.168-.375.375-.375h1.125v2.75H1.75A.375.375 0 0 1 1.375 8zm9.75 2.375v-2.75h1.125c.207 0 .375.168.375.375v2a.375.375 0 0 1-.375.375z" clip-rule="evenodd"/></svg>
            <p class="md:text-2xl sm:text-lg text-sm  font-bold text-white">24hrs support</p>
        </div>
        <div class="flex flex-col items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 md:h-12 md:w-12" viewBox="0 0 24 24"><path fill="#ffff" fill-rule="evenodd" d="M1.818 5.272a.75.75 0 0 1 .91.546l.382 1.528a6.71 6.71 0 0 0 4.975 4.904H16a4.124 4.124 0 0 1 4.096 3.642l.649 5.52a.75.75 0 1 1-1.49.176l-.65-5.52A2.624 2.624 0 0 0 16 13.75H7.918l-.08-.018A8.21 8.21 0 0 1 1.654 7.71l-.382-1.528a.75.75 0 0 1 .545-.91" clip-rule="evenodd"/><path fill="#ffffff" d="M8 13.75V18c0 1.886 0 2.828.586 3.414S10.114 22 12 22s2.828 0 3.414-.586S16 19.886 16 18v-4.25z" opacity="0.5"/><circle cx="12" cy="6" r="4" fill="#ffffff"/></svg>
            <p class="md:text-2xl sm:text-lg text-sm  font-bold text-white">100% private tours</p>
        </div>
        <div class="flex flex-col items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 md:h-12 md:w-12" viewBox="0 0 24 24"><path fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v7m-2 7a3 3 0 1 0 6 0a3 3 0 1 0-6 0m1 2l4-4M11 4h2m-1 13v.01"/></svg>
            <p class="md:text-2xl sm:text-lg text-sm  font-bold text-white">Flexible cancellation</p>
        </div>
     </div>
    </div>
</div>

<style>
    .welcome_bg {
        background-image: url('/zanzibar.jpg');
        height: 460PX;
        width: 100%;
        background-size: 100% 100%;
    background-position: center;
    @media screen and (max-width: 768px) {
        height: auto;
    }
    }
    .welcome_container {
    background-color: rgba(48, 99, 142, 0.6)
    }
</style>