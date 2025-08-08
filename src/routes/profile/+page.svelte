<script lang="ts">
  import type { User } from "$lib/server/db/schema";
  import dayjs from "dayjs";

    // Extend the User type to include bookings and transactions
    interface Booking {
      id: number;
      name: string;
      status: string;
      guests: number;
      arriveDate: string;
      pickup_time: string;
    }

    interface Transaction {
      id: number;
      name: string;
      reference: string;
      status: string;
      amount: number;
      created_At: string;
    }

    interface ExtendedUser extends Omit<User, 'password'> {
      bookings?: Booking[];
      transactions?: Transaction[];
    }

  interface ServerData {
        user: ExtendedUser | null;
    }

    let { data } = $props() as { data: ServerData };
    let checked = $state("profileDetails")
 console.log(data);
</script>

{#if data?.user}
<div class="md:px-[5%] px-[2%] ">
    <div class=" flex flex-row items-center justify-center mt-5">
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
                          <!-- <div class="font-bold">{data?.user?.name.replace(/(?:^|\s)\S/g, (i) => i.toUpperCase())}</div> -->
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
                      <a href="/update_user" class="btn btn-xs">update</a>
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
      {:else if checked === "bookings"}
        <div class="h-full flex items-center justify-center w-fit mx-auto">
          <div class="overflow-x-auto">
            <table class="table table-xs">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Number of guest</th>
                  <th>nationality</th>
                  <th>Arrival Date</th>
                  <th>Pick up time</th>
                </tr>
              </thead>
              <tbody>
                {#each data?.user?.bookings || [] as book, index (book?.id)}
                <tr>
                  <th>{index + 1}</th>
                  <td>{book?.name}</td>
                  <td>{book?.status}</td>
                  <td>{book?.guests}</td>
                  <td>{data?.user?.nationality}</td>
                  <td>{book?.arriveDate}</td>
                  <td>{book?.pickup_time}</td>
                  <th>
                    <a href={`/update_booking/${book?.id}`} class="btn btn-xs">update</a>
                  </th>
                </tr>
                {:else}
                <tr><td colspan="8" class="text-center">You have no bookings yet.</td></tr>
              {/each}
              </tbody>
            </table>
          </div>
        </div>
      {:else}
        <div class="h-full flex items-center justify-center w-fit mx-auto">
          <div class="overflow-x-auto">
            <table class="table table-xs">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Reference</th>
                  <th>Status</th>
                  <th>Amount</th>
                  <th>date</th>
                </tr>
              </thead>
              <tbody>
                {#each data?.user?.transactions || [] as trans, index (trans?.id)}
                <tr>
                  <th>{index + 1}</th>
                  <td>{trans?.name}</td>
                  <td>{trans?.reference}</td>
                  <td>{trans?.status}</td>
                  <td>${trans?.amount}}</td>
                  <td>{dayjs(trans?.created_At).format("DD/MM/YYYY")}</td>
                  <!-- <th>
                    <a href="" class="btn btn-xs">View</a>
                  </th> -->
                </tr>
                {:else}
                <tr><td colspan="8" class="text-center">You have no transactions yet.</td></tr>
                {/each}
              </tbody>
            </table>
          </div>
        </div>
      {/if}
      </div>
      {:else}
<div class="h-full flex items-center justify-center w-fit mx-auto">
    <h1 class="text-2xl font-bold">Please log in to view your profile.</h1>
    </div>
{/if}