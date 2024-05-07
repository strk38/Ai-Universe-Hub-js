const loadData = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const data = await res.json();
    const allInfo = data.data.tools;

    console.log(allInfo);
    // console.log(allInfo.features);
    // console.log(allInfo.features[1].feature_name);
    displayData(allInfo);


    // for (const f of allInfo) {
    //     console.log(f);
    // }
}


const displayData = (infos) => {
    const cardId = document.getElementById('card-data');
    cardId.innerHTML = '';

    const currentDate = new Date();
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-GB', options);
    // console.log(formattedDate); // Output: dd/mm/yyyy format
    //console.log(infos);
    for (const info of infos) {
        let fs = Object.values(info.features);
        // console.log(fs);

        let listItem = '';
        fs.forEach(f => {
            listItem += `<li>${f}</li>`;
        });



        cardId.innerHTML += `
        <div class="flex justify-center" onclick="dataDetail('${info.id}')">
            <div class="card card-compact w-96 bg-base-100 shadow-xl">
            <figure><img src="${info.image}" alt="Image" />
            </figure>
            <div class="card-body">
                <h3 class="font font-semibold text-lg">Features</h3>
                <ol id="ol-list" class="list-decimal mx-4">
                    ${listItem}
                </ol >
                <hr class="border-t-2 border-gray-100 my-2">
                <div class="flex justify-between items-center">
                    <div class='w-32'>
                        <h3 class="font font-semibold text-lg">${info.name}</h3>
                        
                            <h3><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" style="display: inline-block;">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                        </svg> ${info.published_in}</h3>
                        
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="red" class="px-1 w-6 h-6 bg bg-slate-100 border-none rounded-full">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                    </svg>
                </div>
            </div>
            </div>
        </div>
        `;

    }

}

const dataDetail = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
    const data = await res.json();
    const allInfo = data.data;
    //console.log('details ', allInfo);

    let fs = allInfo.features ? Object.values(allInfo.features) : null;
    let fItem = '';
    for (const f of fs) {
        //console.log(f.feature_name);
        fItem += `<li>${f.feature_name}</li>`;
    }
    //console.log(listItem);
    //console.log(allInfo);
    let Is = allInfo.integrations ? Object.values(allInfo.integrations) : null;
    //console.log(Is);
    let InItem = '';
    if (Is === null) {
        InItem += `<li>No Data Found</li>`;
    }
    else {
        for (const i of Is) {
            //console.log(i.feature_name);
            InItem += `<li>${i}</li>`;
        }
    }

    let prc = allInfo.pricing ? Object.values(allInfo.pricing) : null;
    let pItem = '';

    if (prc === null) {
        pItem = `
        <h2 class="bg-white rounded-lg p-1 text-green-500">Free of<br>Cost/<br>Basic</h2>
        <h2 class="bg-white rounded-lg p-1 text-orange-500">Free of<br>Cost/<br>Pro</h2>
        <h2 class="bg-white rounded-lg p-1 text-red-500">Free of<br>Cost/Enterprise</h2>`;
    }
    else {
        for (const p of prc) {
            //console.log(f.feature_name);
            pItem += `<h2 class="bg-white rounded-lg p-1">${p.price}<br>${p.plan}</h2>`;
        }
    }

    my_modal_1.showModal();
    const boxId = document.getElementById('modal-box');
    boxId.innerHTML = `

    <div class="flex gap-4">
        <div class="card w-96  shadow-xl bg-pink-100 border border-red-500">
            <h3 class="mt-2 p-2 font font-semibold text-lg">${allInfo.description}</h3>
            <div class="flex justify-around items-center p-2">${pItem}</div>

            <div class="flex justify-between items-center p-1">
                <div class="w-1/2">
                    <h3 class="font font-semibold text-lg">Features</h3>
                    <ul class="list-disc pl-6">${fItem}</ul>
                </div>
                <div class="w-1/2">
                    <h3 class="font font-semibold text-lg">Integrations</h3>
                    <ul class="list-disc pl-6">${InItem}</ul>
                </div>
            </div>
        </div>

        <!-- right side -->
        <div class="card w-96 bg-base-100 shadow-xl">
            <figure class="px-10 pt-10">
                <img src="${allInfo.image_link[0]}" alt="image"
                    class="rounded-xl" />
            </figure>

            <div class="card-body items-center text-center">
                <h2 class="font font-semibold text-lg">Hi! How are you doing</h2>
                <p>I am doing fine. Thank You.<br>How may I assist you</p>
            </div>
        </div>
    </div>
    `;
}

async function sortData() {
    const res = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const data = await res.json();
    const allData = data.data.tools;

    allData.sort((a, b) => {
        const dateA = new Date(a.published_in);
        const dateB = new Date(b.published_in);
        return dateA - dateB;
    });
    console.log(allData);
    displayData(allData);
}

loadData();

// async function dataDetail(id) {
//     const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
//     const data = await res.json();
//     const allInfo = data.data;
//     //console.log('details ', allInfo);

//     let fs = allInfo.features ? Object.values(allInfo.features) : null;
//     let fItem = '';
//     if (fs === null) {
//         fItem += `<li>No Features to show</li>`;
//     } else {
//         for (const f of fs) {
//             //console.log(f.feature_name);
//             fItem += `<li>${f.feature_name}</li>`;
//         }
//     }

//     //console.log(allInfo.integrations);

//     let Is = allInfo.integrations ? Object.values(allInfo.integrations) : null;
//     let InItem = '';
//     if (Is === null) {
//         InItem += `<li>No Data Found</li>`;
//     }
//     else {
//         for (const i of Is) {
//             //console.log(i.feature_name);
//             InItem += `<li>${i.feature_name}</li>`;
//         }
//     }

//     let prc = allInfo.pricing ? Object.values(allInfo.pricing) : null;
//     let pItem = '';

//     if (prc === null) {
//         pItem = `
//         <h2 class="bg-white rounded-lg p-1">Free of<br>Cost/<br>Basic</h2>
//         <h2 class="bg-white rounded-lg p-1">Free of<br>Cost/<br>Pro</h2>
//         <h2 class="bg-white rounded-lg p-1">Free of<br>Cost/Enterprise</h2>`;
//     }
//     else {
//         for (const p of prc) {
//             //console.log(f.feature_name);
//             pItem += `<h2 class="bg-white rounded-lg p-1">${p.price}<br>${p.plan}</h2>`;
//         }
//     }

//     const boxId = document.getElementById('modal-box');

//     boxId.innerHTML = `
//     <div class="card w-96  shadow-xl bg-pink-100 border border-red-500">
//         <h3 class="mt-2 p-2 font font-semibold text-lg">${allInfo.description}</h3>
//         <div class="flex justify-between items-center p-2">${pItem}</div>

//         <div class="flex justify-between items-center p-2">
//             <div>
//                 <h3 class="font font-semibold text-lg">Features</h3>
//                 <ul>${fItem}</ul>
//             </div>
//             <div>
//                 <h3 class="font font-semibold text-lg">Integrations</h3>
//                 <ul>${InItem}</ul>
//             </div>
//         </div>
//     </div>

//     <!-- right side -->
//     <div class="card w-96 bg-base-100 shadow-xl">
//         <figure class="px-10 pt-10">
//             <img src="${allInfo.image_link[0]}" alt="image"
//                 class="rounded-xl" />
//         </figure>

//         <div class="card-body items-center text-center">
//             <h2 class="font font-semibold text-lg">Hi! How are you doing</h2>
//             <p>I am doing fine. Thank You.<br>How may I assist you</p>
//         </div>
//     </div>
//     `;
// }

