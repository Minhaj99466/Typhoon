function addToCart(productId){
    $.ajax({
        url:'/addtocart',
        method:'post',
        data:{
            id:productId
        },
        success:(response)=>{  
            if(response.success){
                swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Product added to cart',
                showConfirmButton: false,
                timer: 1500,
                });
            }else {
                swal.fire({ 
                position:'center',
                icon: 'warning',
                text: response.message,
                timer: 1500,
                showConfirmButton: false,
                });
            }
        }
    })
}

function deletecart(proId) {
    Swal.fire({
        title: 'Are you sure?',
        text: 'You want to delete cart',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: '/deletecart',
                data: {
                    product: proId,
                },
                method: 'POST',
                success: (response) => {
                    location.reload();
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'Your item has been deleted.',
                        icon: 'success',
                        timer: 1500,
                        showConfirmButton: false
                    });
                },
                error: (error) => {
                    console.log(error);
                    Swal.fire({
                        title: 'Error!',
                        text: 'An error occurred while deleting the item.',
                        icon: 'error',
                        showConfirmButton: false
                    });
                }
            });
        }
    });
}

function changeQuantity(proId, count) {
    $.ajax({
        url: '/changeQuantity',
        data: {
        product: proId,
        count: count
        },
        method: 'post',
        success: (response) => {
        if (response.success) {
            $('#reloadDiv').load('/cart #reloadDiv');
        } else if (response.check) {
            swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Out of stock'
            });
        } else {
            swal.fire({ 
                position:'center',
                icon: 'warning',
                text: response.message,
                timer: 1500,
                showConfirmButton: false,
            });
        }
        },
        error: (error) => {
        console.log(error);
        }
    });
}