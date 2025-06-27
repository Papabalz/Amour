<script lang="ts">
	import type { User } from "$lib/server/db/schema";
  import dayjs from "dayjs";

    // Define the type for the server data

	interface ServerData {
        user: Omit<User, 'password'> | null;
    }

    let { data } = $props() as { data: ServerData };
    let checked = $state("profileDetails")

</script>

{#if data?.user}
<div class="md:px-[5%] px-[2%]">
    <div class=" mt-[1%] flex flex-row items-center justify-center h-full">
    <div class="join">
        <input bind:group={checked} value="profileDetails" class="join-item btn" type="radio" name="options" aria-label="Profile Details" />
        <input bind:group={checked} value="bookings" class="join-item btn" type="radio" name="options" aria-label="Bookings" />
        <input bind:group={checked} value="transactions" class="join-item btn" type="radio" name="options" aria-label="Transactions" />
    </div>
      </div> 
      {#if checked === "profileDetails"}
        <div class="h-full flex items-center justify-center w-fit mx-auto mt-2">
            <div class="overflow-x-auto">
              <table class="table">
                <!-- head -->
                <thead>
                  <tr>
                    <th>
                      <label>
                        <input type="checkbox" class="checkbox" />
                      </label>
                    </th>
                    <th>Name</th>
                    <th>Contact</th>
                    <th>date</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <!-- row 1 -->
                  <tr>
                    <th>
                      <label>
                        <input type="checkbox" class="checkbox" />
                      </label>
                    </th>
                    <td>
                      <div class="flex items-center gap-3">
                        <div class="avatar">
                          <div class="mask mask-squircle h-12 w-12">
                            <img
                              src="blank_avatar.webp"
                              alt="Avatar" />
                          </div>
                        </div>
                        <div>
                          <div class="font-bold">{data?.user?.name.replace(/(?:^|\s)\S/g, (i) => i.toUpperCase())}</div>
                          <div class="text-sm opacity-50">{data?.user?.nationality || "United State"}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {data?.user?.email}
                      <br />
                      <span class="badge badge-ghost badge-sm">{data?.user?.phone_number || null}</span>
                    </td>
                    <td>{dayjs(data?.user?.created_At).format("MMMM D, YYYY")}</td>
                    <th>
                      <button class="btn btn-xs">update</button>
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
      {:else if checked === "bookings"}
        <div class="h-full flex items-center justify-center w-fit mx-auto">
            <h1 class="text-2xl font-bold">Bookings</h1>
            <!-- Add your bookings component here -->
        </div>
      {:else}
        <div class="h-full flex items-center justify-center w-fit mx-auto">
            <h1 class="text-2xl font-bold">Transactions</h1>
            <!-- Add your transactions component here -->
        </div>
      {/if}
      </div>
      {:else}
<div class="h-full flex items-center justify-center w-fit mx-auto">
    <h1 class="text-2xl font-bold">Please log in to view your profile.</h1>
    </div>
{/if}