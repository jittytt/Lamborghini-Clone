const changeCollectibleTab = (ele) => {
        
        document.querySelectorAll('.flex-inline').forEach(element => {
            element.style.borderBottomColor = '#fff';
        });
        ele.style.borderBottomColor = '#000';
        if(ele.id == 'poster'){
            document.querySelector('.discover_store_link').href='./pages/posters.html'
            document.querySelector('.collectible-type').src='https://static.lamborghinistore.com/media/wysiwyg/LMBGST-666-B_2__6.png';
        }

        else if(ele.id == 'toygame'){
            document.querySelector('.discover_store_link').href='./pages/toygame.html'
            document.querySelector('.collectible-type').src='https://static.lamborghinistore.com/media/wysiwyg/LMB-72-02.png';
        }
        else{
            document.querySelector('.discover_store_link').href='./pages/collectorsModels.html'
            document.querySelector('.collectible-type').src='https://static.lamborghinistore.com/media/wysiwyg/LMB-72-03.png';
        }

}