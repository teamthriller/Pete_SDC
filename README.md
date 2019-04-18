# Pete_SDC

Pete's SDC
**************************************
*   GET ALL ALBUBMS BY ARTIST
***************************************
ROUTE
    /ARTIST/{ID}/ALBUMS

  JSON
    [{
      albumName: string
      image: string //path to image
      type: string 
    },
    ...
    ]
*************************************** 
*    GET ALL ALBUMBS WITH ARTIST      *
***************************************
  ROUTE
    /ARTIST/{ID}/ALBUMWARTIST

  JSON
    [{
      albumName: string
      image: string //path to image
      type: string 
    },
    ...
    ]
*****************************************   
*    GET ALL EP's BY ARTIST              *
*****************************************
ROUTE
    /ARTIST/{ID}/EPS

  JSON
    [{
      albumName: string
      image: string //path to image
      type: string 
    },
    ...
    ]
    
*****************************************   
*    GET ALL COMPILATIONS BY ARTIST              *
*****************************************
ROUTE
    /ARTIST/{ID}/COMPILATIONS

  JSON
    [{
      albumName: string
      image: string //path to image
      type: string 
    },
    ...
    ]
