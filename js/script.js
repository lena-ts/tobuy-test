$(document).ready(function(){
	
	function population(customcallback, json, selector) {
			  var listWrapper = document.querySelector(selector);
	  
			  //populate
			  var requestURL = 'json/'+ json + '.json';
			  var request = new XMLHttpRequest();
		    
			  request.open('GET', requestURL);
			  request.responseType = 'json';
			  request.send();    
			
			  request.onload = function() {
			 	 var itemsList = request.response;
			 	 populateItems(itemsList, customcallback);
				}	 
  	       
			function populateItems(jsonObj, callback) {	       
		       for (var i = 0; i < jsonObj.length; i++) {
				  var itemItem = document.createElement('li'),
				  	  itemImageWrapper = document.createElement('div');
				      itemName = document.createElement('h4'),
				      itemShadow = document.createElement('div'),
				  	  itemImage = document.createElement('img');	  		  	  
				  	  	
				  	  itemItem.className = "item col-xs-4 col-sm-4 col-md-4";
				  	  itemShadow.className = "shadow";	
				  	  
				      itemName.textContent = jsonObj[i].title;
				      itemImage.src = jsonObj[i].img;	
				      
				      itemImageWrapper.appendChild(itemImage);
				      itemImageWrapper.appendChild(itemShadow);
				      itemItem.appendChild(itemImageWrapper);	
				      itemItem.appendChild(itemName);	
				      itemImageWrapper.style.background = jsonObj[i].color;
				      itemShadow.style.background = jsonObj[i].color;
				      
				      listWrapper.appendChild(itemItem);        
		       }	
		       callback();
			} 			
	}
	
	
/*
	  var listWrapper = document.querySelector('.items ul');
	  
	  var requestURL = 'items.json';
	  var request = new XMLHttpRequest();
    
	  request.open('GET', requestURL);
	  request.responseType = 'json';
	  request.send();    
	
	  request.onload = function() {
	 	 var itemsList = request.response;
	 	 populateItems(itemsList, removeItem);
		}	 
  	       
	function populateItems(jsonObj, callback) {	       
       for (var i = 0; i < jsonObj.length; i++) {
		  var itemItem = document.createElement('li'),
		  	  itemImageWrapper = document.createElement('div');
		      itemName = document.createElement('h4'),
		      itemShadow = document.createElement('div'),
		  	  itemImage = document.createElement('img');	  		  	  
		  	  	
		  	  itemItem.className = "item col-xs-4 col-sm-4 col-md-4";
		  	  itemShadow.className = "shadow";	
		  	  
		      itemName.textContent = jsonObj[i].title;
		      itemImage.src = jsonObj[i].img;	
		      
		      itemImageWrapper.appendChild(itemImage);
		      itemImageWrapper.appendChild(itemShadow);
		      itemItem.appendChild(itemImageWrapper);	
		      itemItem.appendChild(itemName);	
		      itemImageWrapper.style.background = jsonObj[i].color;
		      itemShadow.style.background = jsonObj[i].color;
		      
		      listWrapper.appendChild(itemItem);        
       }	
       
       callback();
	} 
*/
	function removeItem(list) {	
		
		for (i = 0; i <= $('.items .item').length - 1; i++) {
			var current = $('.items .item').eq(i);
			current.attr('data-index', i);
			
			
			console.log(current, $('.items .item').length);

			
			function showMessage() {
				$('.empty-bag').fadeIn();
			}
		}
		
			$('.items .item').click(function(i){
				$(this).fadeOut('slow');
				$('#recent .recent-items ul').prepend($(this).clone());
			});		
		
	}
	
	population(removeItem, 'items', '.items ul');
		
	function insertItem() {
		$('.items .item').eq(4).insertAfter($('.items .item').eq(7))
	}
	
	$('.footer-panel-toggle').click(function(){
		$('.footer-panel').toggleClass('up');
	});
	
	//Category list populate
	var categoryList = document.querySelector('.category-list ul');
	  var requestCatURL = 'json/categories.json';
	  var requestCat = new XMLHttpRequest();
    
	  requestCat.open('GET', requestCatURL);
	  requestCat.responseType = 'json';
	  requestCat.send();    
	
	  requestCat.onload = function() {
	 	 var categoryList = requestCat.response;
	 	 populateCats(categoryList, populateCategoryView);
	  }	

	function populateCats(jsonObj, callback) {	      
       for (var i = 0; i < jsonObj.length; i++) {
		  var itemItem = document.createElement('li'),
		  	  itemImageWrapper = document.createElement('div');
		      itemName = document.createElement('h4'),
		      itemShadow = document.createElement('div'),
		  	  itemImage = document.createElement('img');	  		  	  
		  	  	
		  	  itemItem.className = "category-item";
		  	  itemShadow.className = "shadow";	
		  	  
		      itemName.textContent = jsonObj[i].title;
		      itemImage.src = jsonObj[i].img;	
		      
		      itemImageWrapper.appendChild(itemImage);
		      itemImageWrapper.appendChild(itemShadow);
		      itemItem.appendChild(itemImageWrapper);	
		      itemItem.appendChild(itemName);	
		      itemImageWrapper.style.background = jsonObj[i].color;
		      itemShadow.style.background = jsonObj[i].color;
		      
		      categoryList.appendChild(itemItem);        
       }	
       
       callback();
	} 	   	
	
	
	clearList();
	populateCategoryView();
	emtyListToggle();
	
	//Clear list
	function clearList(){
		$('.remove-icon').click(function(){
			$('.remove-message').toggleClass('active');
			
			if($('#today-list').hasClass('active')) {
				$('.remove-message-text span').text('Today\'s list');
				$('.remove-message-buttons').addClass('remove-today-list');
			}
			else {
				$('.remove-message-text span').text('Recent');
			}
			
			$('.remove-today-list .remove-button-yes').click(function(){
				$('#today ul').empty();
				$('#today-list small').text('0');
				$('.remove-message').toggleClass('active');
				$('.empty-list').fadeIn();
			});		
		});
		
		$('.remove-button-no').click(function(){
			$('.remove-message').toggleClass('active');
		});	
	}
	
	//Populate Category view
	function populateCategoryView() {
		$('.category-item').click(function(){
			var title = $(this).find('h4').text();
				$('.category-title').text(title);
				
				titleClass = title.toLowerCase().replace(/ /g, '-');			
			
			$('.category-view').addClass('active ' + titleClass);
			$('.category-view-close').click(function(){
				$('.category-view').removeClass('active');
				$('.category-view ul').empty();
			});
			
			var color = '#e9e9e9',
				colormap = {
					'dairy': '#c5e4f8',
					'bakery': '#cdc8bf',
					'fresh-fruits': "#f3ce80",
					'vegetables': "#9ad586",
					'sweeties': '#f3a9d2',
					'nuts-&-dried-fruits': '#fcf2cf',
					'fish': '#82c0e4',
					'meat': '#e8879a',
					'ingredient-&-species': '#f7e5cf',
					'household': '#eccfeb',
					'cereal': '#eecdcc',
					'beverages': '#99ded8'
				}
			
			for (var key in colormap) {
				if (titleClass == key) {
					color = colormap[key];
				}					
			}
						
			population(addtolist, titleClass, '.category-content ul');  
						
			function addtolist(){
				$('.category-view .item').click(function(i){
					$(this).find($('div')).attr('style', 'background:' + color);
					$('#today .items ul').append($(this).clone());	
					$('#today .empty-list').fadeOut();			
				});
			}		
		});
	}
	
	function emtyListToggle() {
		$('.empty-list-add-items-toggle').click(function(){
			$('.footer-panel').toggleClass('up');
		});
	}
});