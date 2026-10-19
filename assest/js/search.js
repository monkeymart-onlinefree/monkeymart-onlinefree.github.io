(function() {
    const searchInput = document.getElementById('search-input');
    const searchForm = document.querySelector('.search-form');
    const searchSuggestions = document.getElementById('search-suggestions');
    const searchResultsPage = document.getElementById('search-results-page');
    const resultsTitle = document.getElementById('search-results-title');
    const resultsNote = document.getElementById('search-results-note');
    const resultsGrid = document.getElementById('search-results-grid');
    const resultsClose = document.getElementById('search-results-close');
    const mobileSearchButton = document.getElementById('mobile-search-button');
    const mobileSearchPopup = document.getElementById('mobile-search-popup');
    const mobileSearchClose = document.getElementById('mobile-search-close');
    const mobileSearchForm = document.getElementById('mobile-search-form');
    const mobileSearchInput = document.getElementById('mobile-search-input');

    if (!searchInput || !searchForm || !searchSuggestions) {
        return;
    }

    const games = [
{'title':'10 Minutes Till Dawn','href':'/class/codex-1/' },
{'title':'1010 Color Match','href':'/class/codex-2/' },
{'title':'11 11','href':'/class/codex-3/' },
{'title':'12 Minibattles','href':'/class/codex-4/' },
{'title':'18 Wheeler Cargo Simulator','href':'/class/codex-5/' },
{'title':'18 Wheeler Cargo Simulator 2','href':'/class/codex-6/' },
{'title':'18 Wheeler Driving Sim','href':'/class/codex-7/' },
{'title':'18 Wheeler Truck Parking','href':'/class/codex-8/' },
{'title':'18 Wheeler Truck Parking 2','href':'/class/codex-9/' },
{'title':'1v1 Lol','href':'/class/codex-10/' },
{'title':'2048','href':'/class/codex-11/' },
{'title':'2048 Cupcakes','href':'/class/codex-12/' },
{'title':'2048 Fusion','href':'/class/codex-13/' },
{'title':'2048 Multitask','href':'/class/codex-14/' },
{'title':'3 Pandas in Japan','href':'/class/codex-15/' },
{'title':'3d Arena Racing','href':'/class/codex-16/' },
{'title':'3d Bowling','href':'/class/codex-17/' },
{'title':'3d Car Simulator','href':'/class/codex-18/' },
{'title':'3d Free Kick','href':'/class/codex-19/' },
{'title':'3d Moto Simulator 2','href':'/class/codex-20/' },
{'title':'4th and Goal 2022','href':'/class/codex-21/' },
{'title':'4wd Off Road Driving Sim','href':'/class/codex-22/' },
{'title':'4x4 Drive Offroad','href':'/class/codex-23/' },
{'title':'4x4 Off Road','href':'/class/codex-24/' },
{'title':'8 Ball Pool','href':'/class/codex-25/' },
{'title':'99 Balls','href':'/class/codex-26/' },
{'title':'99 Nights in the Forest','href':'/class/codex-27/' },
{'title':'a Dance of Fire and Ice','href':'/class/codex-28/' },
{'title':'a Pretty Odd Bunny','href':'/class/codex-29/' },
{'title':'a Small World Cup','href':'/class/codex-30/' },
{'title':'Achievement Unlocked','href':'/class/codex-31/' },
{'title':'Adam and Eve 5 Part 1','href':'/class/codex-32/' },
{'title':'Adam and Eve 5 Part 2','href':'/class/codex-33/' },
{'title':'Adam and Eve 6','href':'/class/codex-34/' },
{'title':'Adam and Eve 7','href':'/class/codex-35/' },
{'title':'Adventure Drivers','href':'/class/codex-36/' },
{'title':'Agar Io','href':'/class/codex-37/' },
{'title':'Agarpaper Io','href':'/class/codex-38/' },
{'title':'Age of War','href':'/class/codex-39/' },
{'title':'Air Hockey Championship Deluxe','href':'/class/codex-40/' },
{'title':'Alien Hominid','href':'/class/codex-41/' },
{'title':'Amazing Rope Vice Spider Vegas','href':'/class/codex-42/' },
{'title':'Amidst the Sky','href':'/class/codex-43/' },
{'title':'Amogus Io','href':'/class/codex-44/' },
{'title':'Among Us','href':'/class/codex-45/' },
{'title':'Angry Birds','href':'/class/codex-46/' },
{'title':'Angry Gran Run','href':'/class/codex-47/' },
{'title':'Ape Sling','href':'/class/codex-48/' },
{'title':'Apple Shooter','href':'/class/codex-49/' },
{'title':'Apple Worm','href':'/class/codex-50/' },
{'title':'Aqua Thrills','href':'/class/codex-51/' },
{'title':'Aquapark Io','href':'/class/codex-52/' },
{'title':'Arcane Archer','href':'/class/codex-53/' },
{'title':'Archery World Tour','href':'/class/codex-54/' },
{'title':'Arena Noob Vs Pro','href':'/class/codex-55/' },
{'title':'Arithmetica','href':'/class/codex-56/' },
{'title':'Arras Io','href':'/class/codex-57/' },
{'title':'Aspiring Artist','href':'/class/codex-58/' },
{'title':'Athletics Hero','href':'/class/codex-59/' },
{'title':'Awesome Tanks','href':'/class/codex-60/' },
{'title':'Awesome Tanks 2','href':'/class/codex-61/' },
{'title':'Axis Football League','href':'/class/codex-62/' },
{'title':'B Cubed','href':'/class/codex-63/' },
{'title':'Backflipper','href':'/class/codex-64/' },
{'title':'Backrooms','href':'/class/codex-65/' },
{'title':'Backrooms 2d','href':'/class/codex-66/' },
{'title':'Bacon May Die','href':'/class/codex-67/' },
{'title':'Bad Egg Io','href':'/class/codex-68/' },
{'title':'Bad Ice Cream','href':'/class/codex-69/' },
{'title':'Bad Ice Cream 2','href':'/class/codex-70/' },
{'title':'Bad Ice Cream 3','href':'/class/codex-71/' },
{'title':'Baldis Basics','href':'/class/codex-72/' },
{'title':'Baldis Basics Field Trip','href':'/class/codex-73/' },
{'title':'Ball Sort Halloween','href':'/class/codex-74/' },
{'title':'Ball Sort Soccer','href':'/class/codex-75/' },
{'title':'Ballistic','href':'/class/codex-76/' },
{'title':'Bank Robbery 2','href':'/class/codex-77/' },
{'title':'Basket and Ball','href':'/class/codex-78/' },
{'title':'Basket Battle','href':'/class/codex-79/' },
{'title':'Basket Bros Io','href':'/class/codex-80/' },
{'title':'Basket Champs','href':'/class/codex-81/' },
{'title':'Basket Monsterz','href':'/class/codex-82/' },
{'title':'Basket Random','href':'/class/codex-83/' },
{'title':'Basket Slam Dunk 2','href':'/class/codex-84/' },
{'title':'Basket Swooshes','href':'/class/codex-85/' },
{'title':'Basket Swooshes Plus','href':'/class/codex-86/' },
{'title':'Basketball Clash','href':'/class/codex-87/' },
{'title':'Basketball Frvr','href':'/class/codex-88/' },
{'title':'Basketball Io','href':'/class/codex-89/' },
{'title':'Basketball King','href':'/class/codex-90/' },
{'title':'Basketball League','href':'/class/codex-91/' },
{'title':'Basketball Legends 2020','href':'/class/codex-92/' },
{'title':'Basketball Line','href':'/class/codex-93/' },
{'title':'Basketball Orbit','href':'/class/codex-94/' },
{'title':'Basketball Serial Shooter','href':'/class/codex-95/' },
{'title':'Basketball Skills','href':'/class/codex-96/' },
{'title':'Basketball Slam Dunk','href':'/class/codex-97/' },
{'title':'Basketball Stars','href':'/class/codex-98/' },
{'title':'Basketball Superstars','href':'/class/codex-99/' },
{'title':'Battle Wheels','href':'/class/codex-100/' },
{'title':'Battledudes Io','href':'/class/codex-101/' },
{'title':'Bearsus','href':'/class/codex-102/' },
{'title':'Betrayal Io','href':'/class/codex-103/' },
{'title':'Bicycle Stunts 3d','href':'/class/codex-104/' },
{'title':'Big Shot Boxing','href':'/class/codex-105/' },
{'title':'Big Tall Small','href':'/class/codex-106/' },
{'title':'Big Tower Tiny Square','href':'/class/codex-107/' },
{'title':'Bike Trials Offroad 1','href':'/class/codex-108/' },
{'title':'Bike Trials Winter 1','href':'/class/codex-109/' },
{'title':'Bike Trials Winter 2','href':'/class/codex-110/' },
{'title':'Biker Street','href':'/class/codex-111/' },
{'title':'Bitlife','href':'/class/codex-112/' },
{'title':'Block Blast','href':'/class/codex-113/' },
{'title':'Block Tanks','href':'/class/codex-114/' },
{'title':'Block the Pig','href':'/class/codex-115/' },
{'title':'Block World','href':'/class/codex-116/' },
{'title':'Blockpost','href':'/class/codex-117/' },
{'title':'Blocky Blast Puzzle','href':'/class/codex-118/' },
{'title':'Blocky Cars','href':'/class/codex-119/' },
{'title':'Blocky Snakes','href':'/class/codex-120/' },
{'title':'Blocky Trials','href':'/class/codex-121/' },
{'title':'Bloons Td 2','href':'/class/codex-122/' },
{'title':'Bloons Td4','href':'/class/codex-123/' },
{'title':'Bloons Tower Defense 1','href':'/class/codex-124/' },
{'title':'Bloxd Io','href':'/class/codex-125/' },
{'title':'Bloxorz','href':'/class/codex-126/' },
{'title':'Blumgi Ball','href':'/class/codex-127/' },
{'title':'Blumgi Bloom','href':'/class/codex-128/' },
{'title':'Blumgi Castle','href':'/class/codex-129/' },
{'title':'Blumgi Paintball','href':'/class/codex-130/' },
{'title':'Blumgi Rocket','href':'/class/codex-131/' },
{'title':'Blumgi Slime','href':'/class/codex-132/' },
{'title':'Blumgi Soccer','href':'/class/codex-133/' },
{'title':'Bob the Robber 2','href':'/class/codex-134/' },
{'title':'Bob the Robber 4','href':'/class/codex-135/' },
{'title':'Bomb It 7','href':'/class/codex-136/' },
{'title':'Booblehead Soccer Royale','href':'/class/codex-137/' },
{'title':'Bottle Flip','href':'/class/codex-138/' },
{'title':'Bottle Flip 3d','href':'/class/codex-139/' },
{'title':'Bouncy Basketball','href':'/class/codex-140/' },
{'title':'Bouncy Dunk','href':'/class/codex-141/' },
{'title':'Bouncy Woods','href':'/class/codex-142/' },
{'title':'Bowling Stars','href':'/class/codex-143/' },
{'title':'Boxing Physics 2','href':'/class/codex-144/' },
{'title':'Boxing Random','href':'/class/codex-145/' },
{'title':'Boxrob','href':'/class/codex-146/' },
{'title':'Boxrob2','href':'/class/codex-147/' },
{'title':'Boxrob3','href':'/class/codex-148/' },
{'title':'Braains Io','href':'/class/codex-149/' },
{'title':'Brain for Monster Truck','href':'/class/codex-150/' },
{'title':'Brain Test 2 Tricky Stories','href':'/class/codex-151/' },
{'title':'Brain Test 3 Tricky Quests','href':'/class/codex-152/' },
{'title':'Brain Test Tricky Puzzles','href':'/class/codex-153/' },
{'title':'Brawl Stars','href':'/class/codex-154/' },
{'title':'Breaking the Bank','href':'/class/codex-155/' },
{'title':'Bubble Pop Adventures','href':'/class/codex-156/' },
{'title':'Bubble Shooter','href':'/class/codex-157/' },
{'title':'Bubble Trouble','href':'/class/codex-158/' },
{'title':'Bubble Trouble 3','href':'/class/codex-159/' },
{'title':'Build Crush','href':'/class/codex-160/' },
{'title':'Bullet Force','href':'/class/codex-161/' },
{'title':'Bullet Party 2','href':'/class/codex-162/' },
{'title':'Bumper Cars Soccer','href':'/class/codex-163/' },
{'title':'Bunny Hop','href':'/class/codex-164/' },
{'title':'Burger Bounty','href':'/class/codex-165/' },
{'title':'Burger Clicker','href':'/class/codex-166/' },
{'title':'Burnin Rubber','href':'/class/codex-167/' },
{'title':'Burnin Rubber 5 Xs','href':'/class/codex-168/' },
{'title':'Burnout Drift Hilltop','href':'/class/codex-169/' },
{'title':'Burnout Drift Seaport Max','href':'/class/codex-170/' },
{'title':'Burrito Bison','href':'/class/codex-171/' },
{'title':'Burrito Bison Launcha Libre','href':'/class/codex-172/' },
{'title':'Bus Parking 3d','href':'/class/codex-173/' },
{'title':'Candy Crush Saga','href':'/class/codex-174/' },
{'title':'Candy Jump','href':'/class/codex-175/' },
{'title':'Cannon Basketball','href':'/class/codex-176/' },
{'title':'Cannon Basketball 2','href':'/class/codex-177/' },
{'title':'Cannon Basketball 3','href':'/class/codex-178/' },
{'title':'Cannon Basketball 4','href':'/class/codex-179/' },
{'title':'Cannon Strike','href':'/class/codex-180/' },
{'title':'Car Climb Racing','href':'/class/codex-181/' },
{'title':'Car Drift Racers 2','href':'/class/codex-182/' },
{'title':'Car Rush','href':'/class/codex-183/' },
{'title':'Car Simulator Arena','href':'/class/codex-184/' },
{'title':'Cars Simulator','href':'/class/codex-185/' },
{'title':'Cars Thief','href':'/class/codex-186/' },
{'title':'Cars Thief Tank Edition','href':'/class/codex-187/' },
{'title':'Cartoon Mini Racing','href':'/class/codex-188/' },
{'title':'Case Clicker','href':'/class/codex-189/' },
{'title':'Cat Gunner Super Zombie Shoot','href':'/class/codex-190/' },
{'title':'Cat Trap','href':'/class/codex-191/' },
{'title':'Cats','href':'/class/codex-192/' },
{'title':'Checkers','href':'/class/codex-193/' },
{'title':'Chicken Merge','href':'/class/codex-194/' },
{'title':'Choppy Orc','href':'/class/codex-195/' },
{'title':'Chrome Dino','href':'/class/codex-196/' },
{'title':'Circlo0','href':'/class/codex-197/' },
{'title':'Circloo 2','href':'/class/codex-198/' },
{'title':'City Bike Stunt 2','href':'/class/codex-199/' },
{'title':'City Car Driving Stunt Master','href':'/class/codex-200/' },
{'title':'City Coach Bus Sim','href':'/class/codex-201/' },
{'title':'City Rider','href':'/class/codex-202/' },
{'title':'Clicker Heroes','href':'/class/codex-203/' },
{'title':'Climb Over It','href':'/class/codex-204/' },
{'title':'Cluster Rush','href':'/class/codex-205/' },
{'title':'Coffee Shop','href':'/class/codex-206/' },
{'title':'Color Road','href':'/class/codex-207/' },
{'title':'Color Road 2','href':'/class/codex-208/' },
{'title':'Color Switch','href':'/class/codex-209/' },
{'title':'Color Tunnel','href':'/class/codex-210/' },
{'title':'Color Tunnel 2','href':'/class/codex-211/' },
{'title':'Connect 3','href':'/class/codex-212/' },
{'title':'Cookie Clicker','href':'/class/codex-213/' },
{'title':'Craftmine','href':'/class/codex-214/' },
{'title':'Crazy Ball 3d','href':'/class/codex-215/' },
{'title':'Crazy Cars','href':'/class/codex-216/' },
{'title':'Crazy Tunnel 3d','href':'/class/codex-217/' },
{'title':'Creative Kill Chamber','href':'/class/codex-218/' },
{'title':'Cricket World Cup','href':'/class/codex-219/' },
{'title':'Crossy Road','href':'/class/codex-220/' },
{'title':'Crowd Run 3d','href':'/class/codex-221/' },
{'title':'Cubefield','href':'/class/codex-222/' },
{'title':'Cubes King','href':'/class/codex-223/' },
{'title':'Cubeshot Io','href':'/class/codex-224/' },
{'title':'Cubito','href':'/class/codex-225/' },
{'title':'Cubito Mayhem','href':'/class/codex-226/' },
{'title':'Cupcakes 2048','href':'/class/codex-227/' },
{'title':'Curve Ball 3d','href':'/class/codex-228/' },
{'title':'Cut the Rope','href':'/class/codex-229/' },
{'title':'Cut the Rope Holiday','href':'/class/codex-230/' },
{'title':'Cut the Rope Time Travel','href':'/class/codex-231/' },
{'title':'Cyber Cars Punk Racing','href':'/class/codex-232/' },
{'title':'Dark Ninja','href':'/class/codex-233/' },
{'title':'Dark Runner','href':'/class/codex-234/' },
{'title':'Dashcraft Io','href':'/class/codex-235/' },
{'title':'Dead Again','href':'/class/codex-236/' },
{'title':'Deadshot Io','href':'/class/codex-237/' },
{'title':'Deal or No Deal','href':'/class/codex-238/' },
{'title':'Death Chase','href':'/class/codex-239/' },
{'title':'Death Chase 3','href':'/class/codex-240/' },
{'title':'Death Run 3d','href':'/class/codex-241/' },
{'title':'Deathcar Io','href':'/class/codex-242/' },
{'title':'Deepest Sword','href':'/class/codex-243/' },
{'title':'Deer Simulator','href':'/class/codex-244/' },
{'title':'Demolition Derby Crash Racing','href':'/class/codex-245/' },
{'title':'Desert Car Racing 1','href':'/class/codex-246/' },
{'title':'Detective Loupe Puzzle','href':'/class/codex-247/' },
{'title':'Diebrary','href':'/class/codex-248/' },
{'title':'Dino Chrome Io','href':'/class/codex-249/' },
{'title':'Dinosaurs Merge Master','href':'/class/codex-250/' },
{'title':'Dog Simulator 3d','href':'/class/codex-251/' },
{'title':'Doge Miner','href':'/class/codex-252/' },
{'title':'Doll Designer','href':'/class/codex-253/' },
{'title':'Doodle Champion Island','href':'/class/codex-254/' },
{'title':'Doodle Jump','href':'/class/codex-255/' },
{'title':'Doom 2','href':'/class/codex-256/' },
{'title':'Down the Hill','href':'/class/codex-257/' },
{'title':'Dragon World','href':'/class/codex-258/' },
{'title':'Draw the Hill','href':'/class/codex-259/' },
{'title':'Dreadhead Parkour','href':'/class/codex-260/' },
{'title':'Drift Boss','href':'/class/codex-261/' },
{'title':'Drift Dudes','href':'/class/codex-262/' },
{'title':'Drift Hunters','href':'/class/codex-263/' },
{'title':'Drive Mad','href':'/class/codex-264/' },
{'title':'Drop Kick World Cup 2018','href':'/class/codex-265/' },
{'title':'Drunken Duel','href':'/class/codex-266/' },
{'title':'Duck Life','href':'/class/codex-267/' },
{'title':'Duck Life 2','href':'/class/codex-268/' },
{'title':'Duck Life 3','href':'/class/codex-269/' },
{'title':'Duck Life 4','href':'/class/codex-270/' },
{'title':'Duck Life 5','href':'/class/codex-271/' },
{'title':'Duke Dashington Remastered','href':'/class/codex-272/' },
{'title':'Dune Game','href':'/class/codex-273/' },
{'title':'Dunkbrush','href':'/class/codex-274/' },
{'title':'Dunker','href':'/class/codex-275/' },
{'title':'Dunkers 2','href':'/class/codex-276/' },
{'title':'E Scooter','href':'/class/codex-277/' },
{'title':'Eagle Ride','href':'/class/codex-278/' },
{'title':'Eagler Craft','href':'/class/codex-279/' },
{'title':'Earn to Die','href':'/class/codex-280/' },
{'title':'Eggy Car','href':'/class/codex-281/' },
{'title':'Elastic Man','href':'/class/codex-282/' },
{'title':'Electron Dash','href':'/class/codex-283/' },
{'title':'Eliza Mall Mania','href':'/class/codex-284/' },
{'title':'Endless Truck','href':'/class/codex-285/' },
{'title':'Endless Tunnel','href':'/class/codex-286/' },
{'title':'Endless War 3','href':'/class/codex-287/' },
{'title':'Energy','href':'/class/codex-288/' },
{'title':'Eparkour Io','href':'/class/codex-289/' },
{'title':'Epic Basketball','href':'/class/codex-290/' },
{'title':'Escape Road','href':'/class/codex-291/' },
{'title':'Escape Road 2','href':'/class/codex-292/' },
{'title':'Escaping the Prison','href':'/class/codex-293/' },
{'title':'Eugenes Life','href':'/class/codex-294/' },
{'title':'Ev Io','href':'/class/codex-295/' },
{'title':'Evo City Driving','href':'/class/codex-296/' },
{'title':'Extreme Car Driving Simulator','href':'/class/codex-297/' },
{'title':'Extreme Car Parking','href':'/class/codex-298/' },
{'title':'Extreme Off Road Cars','href':'/class/codex-299/' },
{'title':'Extreme Off Road Cars 3 Cargo','href':'/class/codex-300/' },
{'title':'Extreme Pamplona','href':'/class/codex-301/' },
{'title':'Extremeoffroadcars2','href':'/class/codex-302/' },
{'title':'Factory Balls Forever','href':'/class/codex-303/' },
{'title':'Fairy Dressup','href':'/class/codex-304/' },
{'title':'Fall Guys Ultimate Knockout','href':'/class/codex-305/' },
{'title':'Falling Fred','href':'/class/codex-306/' },
{'title':'Fancy Pants','href':'/class/codex-307/' },
{'title':'Fancy Pants 2','href':'/class/codex-308/' },
{'title':'Fancy Pants 3','href':'/class/codex-309/' },
{'title':'Farm Match Seasons','href':'/class/codex-310/' },
{'title':'Ferge Io','href':'/class/codex-311/' },
{'title':'Fightz Io','href':'/class/codex-312/' },
{'title':'Fire Truck Rescue','href':'/class/codex-313/' },
{'title':'Fireboy and Watergirl 2','href':'/class/codex-314/' },
{'title':'Fireboy and Watergirl 3','href':'/class/codex-315/' },
{'title':'Fireboy and Watergirl 4','href':'/class/codex-316/' },
{'title':'Fireboy and Watergirl 5','href':'/class/codex-317/' },
{'title':'Fireboy and Watergirl 6','href':'/class/codex-318/' },
{'title':'Fireboy and Watergirl Forest Temple','href':'/class/codex-319/' },
{'title':'Fish Eat Fish','href':'/class/codex-320/' },
{'title':'Fishing and Lines','href':'/class/codex-321/' },
{'title':'Fishing Frenzy','href':'/class/codex-322/' },
{'title':'Five Nights at Freddys','href':'/class/codex-323/' },
{'title':'Five Nights at Freddys 2','href':'/class/codex-324/' },
{'title':'Five Nights at Freddys 3','href':'/class/codex-325/' },
{'title':'Five Nights at Freddys 4','href':'/class/codex-326/' },
{'title':'Five Nights at Freddys Web','href':'/class/codex-327/' },
{'title':'Flappy Bird','href':'/class/codex-328/' },
{'title':'Flappy Dunk','href':'/class/codex-329/' },
{'title':'Fleeing the Complex','href':'/class/codex-330/' },
{'title':'Flip Bottle','href':'/class/codex-331/' },
{'title':'Flipper Dunk 3d','href':'/class/codex-332/' },
{'title':'Flying Car Simulator','href':'/class/codex-333/' },
{'title':'Fnaf Shooter','href':'/class/codex-334/' },
{'title':'Fnafsl','href':'/class/codex-335/' },
{'title':'Fnf','href':'/class/codex-336/' },
{'title':'Foot Chinko','href':'/class/codex-337/' },
{'title':'Football Bros','href':'/class/codex-338/' },
{'title':'Football Legends','href':'/class/codex-339/' },
{'title':'Football Legends 2021','href':'/class/codex-340/' },
{'title':'Football Masters','href':'/class/codex-341/' },
{'title':'Football Strike','href':'/class/codex-342/' },
{'title':'Forged Alliance Forever','href':'/class/codex-343/' },
{'title':'Fortnite','href':'/class/codex-344/' },
{'title':'Fortnite Made in China','href':'/class/codex-345/' },
{'title':'Fortride Open World','href':'/class/codex-346/' },
{'title':'Fortz','href':'/class/codex-347/' },
{'title':'Fred Running','href':'/class/codex-348/' },
{'title':'Free Kick Classic','href':'/class/codex-349/' },
{'title':'Free Kick Shooter','href':'/class/codex-350/' },
{'title':'Free the Key','href':'/class/codex-351/' },
{'title':'Funny Shooter 2','href':'/class/codex-352/' },
{'title':'Funny Shooter Destroy All','href':'/class/codex-353/' },
{'title':'Furious Racing 3d','href':'/class/codex-354/' },
{'title':'G Switch 3','href':'/class/codex-355/' },
{'title':'Gacha Life','href':'/class/codex-356/' },
{'title':'Galaga','href':'/class/codex-357/' },
{'title':'Gartic Io','href':'/class/codex-358/' },
{'title':'Gartic Phone','href':'/class/codex-359/' },
{'title':'Gartic Phone Io','href':'/class/codex-360/' },
{'title':'Geodash','href':'/class/codex-361/' },
{'title':'Geodash 2','href':'/class/codex-362/' },
{'title':'Geometry Monster Shell Shockers','href':'/class/codex-363/' },
{'title':'Get on Top','href':'/class/codex-364/' },
{'title':'Getaway Shootout','href':'/class/codex-365/' },
{'title':'Getting Over It','href':'/class/codex-366/' },
{'title':'Gigga Io','href':'/class/codex-367/' },
{'title':'Gladihoppers','href':'/class/codex-368/' },
{'title':'Go Kart Go Ultra','href':'/class/codex-369/' },
{'title':'Gobble','href':'/class/codex-370/' },
{'title':'Gobdun','href':'/class/codex-371/' },
{'title':'Gold Digger Frvr','href':'/class/codex-372/' },
{'title':'Golf Champions','href':'/class/codex-373/' },
{'title':'Golf Orbit','href':'/class/codex-374/' },
{'title':'Golfinity','href':'/class/codex-375/' },
{'title':'Google Feud','href':'/class/codex-376/' },
{'title':'Google Snake','href':'/class/codex-377/' },
{'title':'Gp Moto Racing','href':'/class/codex-378/' },
{'title':'Gp Moto Racing 3','href':'/class/codex-379/' },
{'title':'Grand Prix Hero','href':'/class/codex-380/' },
{'title':'Grand Vegas Simulator','href':'/class/codex-381/' },
{'title':'Granny','href':'/class/codex-382/' },
{'title':'Grapple Grip','href':'/class/codex-383/' },
{'title':'Gravity Soccer','href':'/class/codex-384/' },
{'title':'Grindcraft','href':'/class/codex-385/' },
{'title':'Grindcraft Remastered','href':'/class/codex-386/' },
{'title':'Growden Io','href':'/class/codex-387/' },
{'title':'Gswitch','href':'/class/codex-388/' },
{'title':'Gswitch 2','href':'/class/codex-389/' },
{'title':'Gswitch 4','href':'/class/codex-390/' },
{'title':'Guess the Kitty','href':'/class/codex-391/' },
{'title':'Gulper Io','href':'/class/codex-392/' },
{'title':'Gun Blood','href':'/class/codex-393/' },
{'title':'Gun Fest','href':'/class/codex-394/' },
{'title':'Gun Mayhem 2','href':'/class/codex-395/' },
{'title':'Gun Mayhem 3','href':'/class/codex-396/' },
{'title':'Gun Mayhem Redux','href':'/class/codex-397/' },
{'title':'Gun Spin','href':'/class/codex-398/' },
{'title':'Halloween Lonely Road Racing','href':'/class/codex-399/' },
{'title':'Halloween Skeleton Smash','href':'/class/codex-400/' },
{'title':'Hammer 2','href':'/class/codex-401/' },
{'title':'Hanger','href':'/class/codex-402/' },
{'title':'Hanger 2','href':'/class/codex-403/' },
{'title':'Happy Fishing','href':'/class/codex-404/' },
{'title':'Happy Room','href':'/class/codex-405/' },
{'title':'Happy Wheels','href':'/class/codex-406/' },
{'title':'Head Basketball','href':'/class/codex-407/' },
{'title':'Head Soccer 2023','href':'/class/codex-408/' },
{'title':'Heads Arena Soccer All Stars','href':'/class/codex-409/' },
{'title':'Heart Star Html5','href':'/class/codex-410/' },
{'title':'Hexanaut Io','href':'/class/codex-411/' },
{'title':'Hexbee Merger','href':'/class/codex-412/' },
{'title':'Hextris','href':'/class/codex-413/' },
{'title':'Hide and Smash','href':'/class/codex-414/' },
{'title':'Highway Bike Simulator','href':'/class/codex-415/' },
{'title':'Highway Racer 3d','href':'/class/codex-416/' },
{'title':'Highway Rider Extreme','href':'/class/codex-417/' },
{'title':'Highway Traffic','href':'/class/codex-418/' },
{'title':'Hill Climb Racing','href':'/class/codex-419/' },
{'title':'Hill Climb Racing 2','href':'/class/codex-420/' },
{'title':'Hills of Steel','href':'/class/codex-421/' },
{'title':'Hole Io','href':'/class/codex-422/' },
{'title':'Hoop World 3d','href':'/class/codex-423/' },
{'title':'Horse Shoeing','href':'/class/codex-424/' },
{'title':'Horse Simulator 3d','href':'/class/codex-425/' },
{'title':'House of Hazards','href':'/class/codex-426/' },
{'title':'Hover Racer','href':'/class/codex-427/' },
{'title':'Hover Racer Drive','href':'/class/codex-428/' },
{'title':'Icy Purple Head 2','href':'/class/codex-429/' },
{'title':'Icy Purple Head 3','href':'/class/codex-430/' },
{'title':'Icy Purple Head Superslide','href':'/class/codex-431/' },
{'title':'Icycle','href':'/class/codex-432/' },
{'title':'Idle Ants','href':'/class/codex-433/' },
{'title':'Idle Breakout','href':'/class/codex-434/' },
{'title':'Idle Dice','href':'/class/codex-435/' },
{'title':'Idle Digging Tycoon','href':'/class/codex-436/' },
{'title':'Idle Light City','href':'/class/codex-437/' },
{'title':'Idle Lumber Inc','href':'/class/codex-438/' },
{'title':'Idle Miner','href':'/class/codex-439/' },
{'title':'Idle Mining Empire','href':'/class/codex-440/' },
{'title':'Idle Restaurants','href':'/class/codex-441/' },
{'title':'Idle Startup Tycoon','href':'/class/codex-442/' },
{'title':'Idle Tree City','href':'/class/codex-443/' },
{'title':'Impossible Monster Truck','href':'/class/codex-444/' },
{'title':'Impossible Tic Tac Toe','href':'/class/codex-445/' },
{'title':'Indian Truck','href':'/class/codex-446/' },
{'title':'Indian Truck Simulator 3d','href':'/class/codex-447/' },
{'title':'Indian Uphill Bus Simulator 3d','href':'/class/codex-448/' },
{'title':'Infiltrating the Airship','href':'/class/codex-449/' },
{'title':'Infinite Soccer','href':'/class/codex-450/' },
{'title':'Infinity Loop','href':'/class/codex-451/' },
{'title':'Interactive Buddy','href':'/class/codex-452/' },
{'title':'Iron Snout','href':'/class/codex-453/' },
{'title':'Iron Snout 2','href':'/class/codex-454/' },
{'title':'Jelly Truck','href':'/class/codex-455/' },
{'title':'Jet Boy','href':'/class/codex-456/' },
{'title':'Jetpack Joyride','href':'/class/codex-457/' },
{'title':'Jewel Shuffle','href':'/class/codex-458/' },
{'title':'Jewels Blitz 5','href':'/class/codex-459/' },
{'title':'Johnny Revenge','href':'/class/codex-460/' },
{'title':'Johnny Trigger','href':'/class/codex-461/' },
{'title':'Johnny Upgrade','href':'/class/codex-462/' },
{'title':'Jollyworld','href':'/class/codex-463/' },
{'title':'Jump Up 3d','href':'/class/codex-464/' },
{'title':'Jump Up 3d Mini Basketball','href':'/class/codex-465/' },
{'title':'Jumping Shell','href':'/class/codex-466/' },
{'title':'Jungle Td','href':'/class/codex-467/' },
{'title':'Just Fall Lol','href':'/class/codex-468/' },
{'title':'Kart Fight Io','href':'/class/codex-469/' },
{'title':'Kart Race 3d','href':'/class/codex-470/' },
{'title':'Kart Wars','href':'/class/codex-471/' },
{'title':'Kawaii Dressup','href':'/class/codex-472/' },
{'title':'Kirka Io','href':'/class/codex-473/' },
{'title':'Kix Dream Soccer','href':'/class/codex-474/' },
{'title':'Knight Hero Adventure Idle Rpg','href':'/class/codex-475/' },
{'title':'Krunker Io','href':'/class/codex-476/' },
{'title':'Leader Strike','href':'/class/codex-477/' },
{'title':'Learn to Fly','href':'/class/codex-478/' },
{'title':'Learn to Fly 3','href':'/class/codex-479/' },
{'title':'Learntofly2','href':'/class/codex-480/' },
{'title':'Lemonade Stand','href':'/class/codex-481/' },
{'title':'Level Devil','href':'/class/codex-482/' },
{'title':'Life Choices Life Simulator','href':'/class/codex-483/' },
{'title':'Life the Game','href':'/class/codex-484/' },
{'title':'Linebacker Alley 2','href':'/class/codex-485/' },
{'title':'Lines to Fill','href':'/class/codex-486/' },
{'title':'Lol Shot Io','href':'/class/codex-487/' },
{'title':'Lolbeans Io','href':'/class/codex-488/' },
{'title':'Love Tester','href':'/class/codex-489/' },
{'title':'Ludo Hero','href':'/class/codex-490/' },
{'title':'Ludo Multiplayer','href':'/class/codex-491/' },
{'title':'Lurkers Io','href':'/class/codex-492/' },
{'title':'Mad Day','href':'/class/codex-493/' },
{'title':'Mad Gunz','href':'/class/codex-494/' },
{'title':'Mad Shark','href':'/class/codex-495/' },
{'title':'Mad Truck Challenge','href':'/class/codex-496/' },
{'title':'Mad Truck Challenge Special','href':'/class/codex-497/' },
{'title':'Madalin Cars Multiplayer','href':'/class/codex-498/' },
{'title':'Madalin Stunt Cars 2','href':'/class/codex-499/' },
{'title':'Madalin Stunt Cars 3','href':'/class/codex-500/' },
{'title':'Magikmon','href':'/class/codex-501/' },
{'title':'Make Up Runner','href':'/class/codex-502/' },
{'title':'Marble Dash','href':'/class/codex-503/' },
{'title':'Marbles Sorting','href':'/class/codex-504/' },
{'title':'Masked Forces','href':'/class/codex-505/' },
{'title':'Master Chess','href':'/class/codex-506/' },
{'title':'Maze Path of Light','href':'/class/codex-507/' },
{'title':'Maze Planet 3d','href':'/class/codex-508/' },
{'title':'Mega Ramp Car Stunts','href':'/class/codex-509/' },
{'title':'Merc Zone','href':'/class/codex-510/' },
{'title':'Merge Alphabet','href':'/class/codex-511/' },
{'title':'Merge Cakes','href':'/class/codex-512/' },
{'title':'Merge Cyber Racers','href':'/class/codex-513/' },
{'title':'Merge Harvest','href':'/class/codex-514/' },
{'title':'Merge Master','href':'/class/codex-515/' },
{'title':'Merge Rainbow','href':'/class/codex-516/' },
{'title':'Merge Round Racers','href':'/class/codex-517/' },
{'title':'Microwars','href':'/class/codex-518/' },
{'title':'Minecraft 1 5 2','href':'/class/codex-519/' },
{'title':'Minecraft 1 8 8','href':'/class/codex-520/' },
{'title':'Minecraft Builder','href':'/class/codex-521/' },
{'title':'Minecraft Case Simulator','href':'/class/codex-522/' },
{'title':'Minecraft Classic','href':'/class/codex-523/' },
{'title':'Minesweeper','href':'/class/codex-524/' },
{'title':'Minibattles','href':'/class/codex-525/' },
{'title':'Mob City','href':'/class/codex-526/' },
{'title':'Money Movers','href':'/class/codex-527/' },
{'title':'Money Movers 2','href':'/class/codex-528/' },
{'title':'Money Movers 3','href':'/class/codex-529/' },
{'title':'Money Roller','href':'/class/codex-530/' },
{'title':'Money Rush','href':'/class/codex-531/' },
{'title':'Monkey Mart','href':'/class/codex-532/' },
{'title':'Monster Tracks','href':'/class/codex-533/' },
{'title':'Monster Truck Destroyer','href':'/class/codex-534/' },
{'title':'Monster Truck Vs Zombie','href':'/class/codex-535/' },
{'title':'Monsters Wheels Special','href':'/class/codex-536/' },
{'title':'Moomoo Io Sandbox','href':'/class/codex-537/' },
{'title':'Mosaic Puzzle Art','href':'/class/codex-538/' },
{'title':'Moto Maniac','href':'/class/codex-539/' },
{'title':'Moto Maniac 2','href':'/class/codex-540/' },
{'title':'Moto Maniac 3','href':'/class/codex-541/' },
{'title':'Moto Road Rash 3d','href':'/class/codex-542/' },
{'title':'Moto Trial Racing 2','href':'/class/codex-543/' },
{'title':'Moto X3m','href':'/class/codex-544/' },
{'title':'Moto X3m 2','href':'/class/codex-545/' },
{'title':'Moto X3m 3 Pool Party','href':'/class/codex-546/' },
{'title':'Moto X3m 4 Winter','href':'/class/codex-547/' },
{'title':'Moto X3m Pool Party','href':'/class/codex-548/' },
{'title':'Moto X3m Spooky Land','href':'/class/codex-549/' },
{'title':'Mr Bullet','href':'/class/codex-550/' },
{'title':'Murder','href':'/class/codex-551/' },
{'title':'Mutazone','href':'/class/codex-552/' },
{'title':'My Pony My Little Race','href':'/class/codex-553/' },
{'title':'N Gon','href':'/class/codex-554/' },
{'title':'Nail Stack','href':'/class/codex-555/' },
{'title':'Neon Biker','href':'/class/codex-556/' },
{'title':'Neon Racer','href':'/class/codex-557/' },
{'title':'Neon War','href':'/class/codex-558/' },
{'title':'Ninja Cat Exploit','href':'/class/codex-559/' },
{'title':'Noob Basketball Clicker','href':'/class/codex-560/' },
{'title':'Noob Drive','href':'/class/codex-561/' },
{'title':'Noob Steve','href':'/class/codex-562/' },
{'title':'Noob Steve Parkour','href':'/class/codex-563/' },
{'title':'Nugget Clicker','href':'/class/codex-564/' },
{'title':'Off Road Rain Cargo Simulator','href':'/class/codex-565/' },
{'title':'Offroad Forest Racing','href':'/class/codex-566/' },
{'title':'Offroad Ultimate','href':'/class/codex-567/' },
{'title':'Offroader V5','href':'/class/codex-568/' },
{'title':'Onion Boy','href':'/class/codex-569/' },
{'title':'Only 3d Parkour','href':'/class/codex-570/' },
{'title':'Only Up','href':'/class/codex-571/' },
{'title':'Only Up 2','href':'/class/codex-572/' },
{'title':'Only Up 3d Parkour','href':'/class/codex-573/' },
{'title':'Ooze Odyssey','href':'/class/codex-574/' },
{'title':'Orbital Survival','href':'/class/codex-575/' },
{'title':'Ovo','href':'/class/codex-576/' },
{'title':'Ovo 2 144 Version','href':'/class/codex-577/' },
{'title':'Ovo 3 Dimensions','href':'/class/codex-578/' },
{'title':'Pac Man','href':'/class/codex-579/' },
{'title':'Pacman Remake','href':'/class/codex-580/' },
{'title':'Panda Bubble Shooter','href':'/class/codex-581/' },
{'title':'Panda Simulator 3d','href':'/class/codex-582/' },
{'title':'Papas Burgeria','href':'/class/codex-583/' },
{'title':'Papas Freezeria','href':'/class/codex-584/' },
{'title':'Papas Pizzaria','href':'/class/codex-585/' },
{'title':'Paper Fighter 3d','href':'/class/codex-586/' },
{'title':'Paper Io','href':'/class/codex-587/' },
{'title':'Paper Io 2','href':'/class/codex-588/' },
{'title':'Paper Minecraft','href':'/class/codex-589/' },
{'title':'Park Out','href':'/class/codex-590/' },
{'title':'Parking Fury','href':'/class/codex-591/' },
{'title':'Parking Fury 2','href':'/class/codex-592/' },
{'title':'Parking Fury 3','href':'/class/codex-593/' },
{'title':'Parking Fury 3d','href':'/class/codex-594/' },
{'title':'Parking Fury 3d Bounty Hunter','href':'/class/codex-595/' },
{'title':'Parking Fury 3d Night Thief','href':'/class/codex-596/' },
{'title':'Parkour Block 3d','href':'/class/codex-597/' },
{'title':'Parkour Race','href':'/class/codex-598/' },
{'title':'Penalty Fever','href':'/class/codex-599/' },
{'title':'Penalty Kick','href':'/class/codex-600/' },
{'title':'Penalty Kicks','href':'/class/codex-601/' },
{'title':'Penalty Shooters 2','href':'/class/codex-602/' },
{'title':'Penalty Shooters 3','href':'/class/codex-603/' },
{'title':'Perfect Peel','href':'/class/codex-604/' },
{'title':'Petz Lol','href':'/class/codex-605/' },
{'title':'Ping Pong Html5','href':'/class/codex-606/' },
{'title':'Pixel Gun 3d','href':'/class/codex-607/' },
{'title':'Pixel Gun Apocalypse 2','href':'/class/codex-608/' },
{'title':'Pixel Gun Survival','href':'/class/codex-609/' },
{'title':'Pixel Shooter','href':'/class/codex-610/' },
{'title':'Pixel Smash Duel','href':'/class/codex-611/' },
{'title':'Pixwars 2','href':'/class/codex-612/' },
{'title':'Pizza Tower','href':'/class/codex-613/' },
{'title':'Plactions','href':'/class/codex-614/' },
{'title':'Plants Vs Zombies','href':'/class/codex-615/' },
{'title':'Pokemon Emerald','href':'/class/codex-616/' },
{'title':'Poly Track','href':'/class/codex-617/' },
{'title':'Pool Club','href':'/class/codex-618/' },
{'title':'Poop Clicker 3','href':'/class/codex-619/' },
{'title':'Poor Bunny','href':'/class/codex-620/' },
{'title':'Pop It Master','href':'/class/codex-621/' },
{'title':'Poppy Glamrock','href':'/class/codex-622/' },
{'title':'Pou','href':'/class/codex-623/' },
{'title':'Power Badminton','href':'/class/codex-624/' },
{'title':'President Simulator','href':'/class/codex-625/' },
{'title':'Pudding Monsters','href':'/class/codex-626/' },
{'title':'Push the Box','href':'/class/codex-627/' },
{'title':'Push the Box 3d','href':'/class/codex-628/' },
{'title':'Rabbit Samurai','href':'/class/codex-629/' },
{'title':'Rabbit Samurai 2','href':'/class/codex-630/' },
{'title':'Raft Wars','href':'/class/codex-631/' },
{'title':'Raft Wars 2','href':'/class/codex-632/' },
{'title':'Ragdoll Archers','href':'/class/codex-633/' },
{'title':'Ragdoll Hit','href':'/class/codex-634/' },
{'title':'Rainbow Parkour','href':'/class/codex-635/' },
{'title':'Rally Champion','href':'/class/codex-636/' },
{'title':'Real Flying Truck Simulator 3d','href':'/class/codex-637/' },
{'title':'Real Garbage Truck','href':'/class/codex-638/' },
{'title':'Recoil','href':'/class/codex-639/' },
{'title':'Red Ball 4','href':'/class/codex-640/' },
{'title':'Red Driver 5','href':'/class/codex-641/' },
{'title':'Repuls Io','href':'/class/codex-642/' },
{'title':'Retro Bowl','href':'/class/codex-643/' },
{'title':'Retro Bowl College','href':'/class/codex-644/' },
{'title':'Riddle School 5','href':'/class/codex-645/' },
{'title':'Riddle Transfer 2','href':'/class/codex-646/' },
{'title':'Rise of Neon Square','href':'/class/codex-647/' },
{'title':'Roblox','href':'/class/codex-648/' },
{'title':'Rocket League','href':'/class/codex-649/' },
{'title':'Rocket Pult','href':'/class/codex-650/' },
{'title':'Rocket Soccer Derby','href':'/class/codex-651/' },
{'title':'Rogue Dunk','href':'/class/codex-652/' },
{'title':'Rolling Ball 3d','href':'/class/codex-653/' },
{'title':'Rolly Vortex','href':'/class/codex-654/' },
{'title':'Rooftop Snipers','href':'/class/codex-655/' },
{'title':'Rooftop Snipers 2','href':'/class/codex-656/' },
{'title':'Roper','href':'/class/codex-657/' },
{'title':'Rowdy Wrestling','href':'/class/codex-658/' },
{'title':'Royale Dudes','href':'/class/codex-659/' },
{'title':'Run 3','href':'/class/codex-660/' },
{'title':'Run 3 Editor','href':'/class/codex-661/' },
{'title':'Running Fred','href':'/class/codex-662/' },
{'title':'Rusher Crusher','href':'/class/codex-663/' },
{'title':'Sandstrike Io','href':'/class/codex-664/' },
{'title':'Sausage Flip','href':'/class/codex-665/' },
{'title':'Save the Doge','href':'/class/codex-666/' },
{'title':'Scrap Metal 3 Infernal Trap','href':'/class/codex-667/' },
{'title':'Shady Bears','href':'/class/codex-668/' },
{'title':'Shape Fold','href':'/class/codex-669/' },
{'title':'Shape Fold Animals','href':'/class/codex-670/' },
{'title':'Shell Shockers','href':'/class/codex-671/' },
{'title':'Ships 3d','href':'/class/codex-672/' },
{'title':'Short Ride','href':'/class/codex-673/' },
{'title':'Simplyup Io','href':'/class/codex-674/' },
{'title':'Skibidi Toilet Rampage','href':'/class/codex-675/' },
{'title':'Skiing Fred','href':'/class/codex-676/' },
{'title':'Skillfite Io','href':'/class/codex-677/' },
{'title':'Skyblock','href':'/class/codex-678/' },
{'title':'Slime Road','href':'/class/codex-679/' },
{'title':'Slime Rush Td','href':'/class/codex-680/' },
{'title':'Slope','href':'/class/codex-681/' },
{'title':'Slope 2','href':'/class/codex-682/' },
{'title':'Slope 3','href':'/class/codex-683/' },
{'title':'Slope City','href':'/class/codex-684/' },
{'title':'Slope Game','href':'/class/codex-685/' },
{'title':'Slope Tunnel','href':'/class/codex-686/' },
{'title':'Slow Roads','href':'/class/codex-687/' },
{'title':'Smash Karts','href':'/class/codex-688/' },
{'title':'Snail Bob 5 Love Story','href':'/class/codex-689/' },
{'title':'Snail Bob 6 Winter Story','href':'/class/codex-690/' },
{'title':'Snail Bob 7 Fantasy Story','href':'/class/codex-691/' },
{'title':'Snail Bob 8 Island Story','href':'/class/codex-692/' },
{'title':'Snake Mlg Edition','href':'/class/codex-693/' },
{'title':'Snay Io','href':'/class/codex-694/' },
{'title':'Sniper Shot','href':'/class/codex-695/' },
{'title':'Sniper Shot Bullet Time','href':'/class/codex-696/' },
{'title':'Snipey Io','href':'/class/codex-697/' },
{'title':'Snow Rider 3d','href':'/class/codex-698/' },
{'title':'Soccer Heads','href':'/class/codex-699/' },
{'title':'Soccer Random','href':'/class/codex-700/' },
{'title':'Soccer Skills Champions League','href':'/class/codex-701/' },
{'title':'Soccer Skills Euro Cup','href':'/class/codex-702/' },
{'title':'Soccer Skills Euro Cup 2021','href':'/class/codex-703/' },
{'title':'Soccer Skills World Cup','href':'/class/codex-704/' },
{'title':'Sonic the Hedgehog Remastere','href':'/class/codex-705/' },
{'title':'Spider Solitaire','href':'/class/codex-706/' },
{'title':'Sprinter','href':'/class/codex-707/' },
{'title':'Squid Game','href':'/class/codex-708/' },
{'title':'Stabfish 2','href':'/class/codex-709/' },
{'title':'Stabfish Io','href':'/class/codex-710/' },
{'title':'Stack Bump 3d','href':'/class/codex-711/' },
{'title':'Stair Race 3d','href':'/class/codex-712/' },
{'title':'Starblast','href':'/class/codex-713/' },
{'title':'Steal a Brainrot','href':'/class/codex-714/' },
{'title':'Stealing the Diamond','href':'/class/codex-715/' },
{'title':'Stick Archers Battle','href':'/class/codex-716/' },
{'title':'Stick Defenders','href':'/class/codex-717/' },
{'title':'Stick Duel Battle','href':'/class/codex-718/' },
{'title':'Stick Merge','href':'/class/codex-719/' },
{'title':'Stick Merge Halloween','href':'/class/codex-720/' },
{'title':'Stickbattle Lol','href':'/class/codex-721/' },
{'title':'Stickman Army the Resistance','href':'/class/codex-722/' },
{'title':'Stickman Boost','href':'/class/codex-723/' },
{'title':'Stickman Boost 2','href':'/class/codex-724/' },
{'title':'Stickman Fighter 2','href':'/class/codex-725/' },
{'title':'Stickman Fighter Epic Battle','href':'/class/codex-726/' },
{'title':'Stickman Fighter Epic Battle 2','href':'/class/codex-727/' },
{'title':'Stickman Fighter Mega Brawl','href':'/class/codex-728/' },
{'title':'Stickman Golf','href':'/class/codex-729/' },
{'title':'Stickman Hook','href':'/class/codex-730/' },
{'title':'Stickman Ragdoll Crash Fun','href':'/class/codex-731/' },
{'title':'Stickman Run','href':'/class/codex-732/' },
{'title':'Stickman School Run','href':'/class/codex-733/' },
{'title':'Stock Car Hero','href':'/class/codex-734/' },
{'title':'Street Ball Jam','href':'/class/codex-735/' },
{'title':'Street Ball Star','href':'/class/codex-736/' },
{'title':'Striker Dummies','href':'/class/codex-737/' },
{'title':'Stunt Biker 3d','href':'/class/codex-738/' },
{'title':'Stunt Car Challenge 3','href':'/class/codex-739/' },
{'title':'Stupid Zombies','href':'/class/codex-740/' },
{'title':'Stupid Zombies 2','href':'/class/codex-741/' },
{'title':'Subway Runner','href':'/class/codex-742/' },
{'title':'Subway Surfers','href':'/class/codex-743/' },
{'title':'Subway Surfers Bali','href':'/class/codex-744/' },
{'title':'Subway Surfers Beijing','href':'/class/codex-745/' },
{'title':'Subway Surfers Havana','href':'/class/codex-746/' },
{'title':'Subway Surfers Hawaii','href':'/class/codex-747/' },
{'title':'Subway Surfers Hongkong','href':'/class/codex-748/' },
{'title':'Subway Surfers Houston','href':'/class/codex-749/' },
{'title':'Subway Surfers Monaco','href':'/class/codex-750/' },
{'title':'Subway Surfers Mumbai','href':'/class/codex-751/' },
{'title':'Subway Surfers New Orleans','href':'/class/codex-752/' },
{'title':'Subway Surfers New York','href':'/class/codex-753/' },
{'title':'Subway Surfers San Francisco','href':'/class/codex-754/' },
{'title':'Subway Surfers Singapore','href':'/class/codex-755/' },
{'title':'Subway Surfers Tokyo','href':'/class/codex-756/' },
{'title':'Subway Surfers Venice','href':'/class/codex-757/' },
{'title':'Subway Surfers Winter Holiday','href':'/class/codex-758/' },
{'title':'Subway Surfers Zurich','href':'/class/codex-759/' },
{'title':'Sugar Shock Io','href':'/class/codex-760/' },
{'title':'Suika','href':'/class/codex-761/' },
{'title':'Super Bike the Champion','href':'/class/codex-762/' },
{'title':'Super Falling Fred','href':'/class/codex-763/' },
{'title':'Super Fowlst','href':'/class/codex-764/' },
{'title':'Super Hexbee Merger','href':'/class/codex-765/' },
{'title':'Super Hot','href':'/class/codex-766/' },
{'title':'Super Liquid Soccer','href':'/class/codex-767/' },
{'title':'Super Mario 64','href':'/class/codex-768/' },
{'title':'Super Mario Bros','href':'/class/codex-769/' },
{'title':'Super Mx the Champion','href':'/class/codex-770/' },
{'title':'Super Racing Gt Drag Pro','href':'/class/codex-771/' },
{'title':'Super Santa Kicker','href':'/class/codex-772/' },
{'title':'Super Slope Game','href':'/class/codex-773/' },
{'title':'Super Smash Flash 2','href':'/class/codex-774/' },
{'title':'Super Star Car','href':'/class/codex-775/' },
{'title':'Super Tunnel Rush','href':'/class/codex-776/' },
{'title':'Superbattle 2','href':'/class/codex-777/' },
{'title':'Superbike Hero','href':'/class/codex-778/' },
{'title':'Surviv Io','href':'/class/codex-779/' },
{'title':'Survival Race','href':'/class/codex-780/' },
{'title':'Survivor in Rainbow Monster','href':'/class/codex-781/' },
{'title':'Sushi Party','href':'/class/codex-782/' },
{'title':'Swatforce Vs Terrorists','href':'/class/codex-783/' },
{'title':'Swingo','href':'/class/codex-784/' },
{'title':'Swipe Fighter Heroes','href':'/class/codex-785/' },
{'title':'Table Tennis Ultimate Tournament','href':'/class/codex-786/' },
{'title':'Tag','href':'/class/codex-787/' },
{'title':'Tag 2','href':'/class/codex-788/' },
{'title':'Taming Io','href':'/class/codex-789/' },
{'title':'Tank Trouble','href':'/class/codex-790/' },
{'title':'Tank Trouble 2','href':'/class/codex-791/' },
{'title':'Tanuki Sunset','href':'/class/codex-792/' },
{'title':'Tap Goal','href':'/class/codex-793/' },
{'title':'Tap Tap Shots','href':'/class/codex-794/' },
{'title':'Temple of Boom','href':'/class/codex-795/' },
{'title':'Temple Run','href':'/class/codex-796/' },
{'title':'Temple Run 2','href':'/class/codex-797/' },
{'title':'Temple Run 2 Frozen Shadows','href':'/class/codex-798/' },
{'title':'Temple Run 2 Holi Festival','href':'/class/codex-799/' },
{'title':'Temple Run 2 Jungle Fall','href':'/class/codex-800/' },
{'title':'Tennis Masters','href':'/class/codex-801/' },
{'title':'Tetris','href':'/class/codex-802/' },
{'title':'Tetris 99','href':'/class/codex-803/' },
{'title':'Tetris Flash','href':'/class/codex-804/' },
{'title':'the Backrooms 3d','href':'/class/codex-805/' },
{'title':'the Bowling Club','href':'/class/codex-806/' },
{'title':'the Final Earth','href':'/class/codex-807/' },
{'title':'the Final Earth 2','href':'/class/codex-808/' },
{'title':'the Fish Master','href':'/class/codex-809/' },
{'title':'the Heist','href':'/class/codex-810/' },
{'title':'the Impossible Quiz','href':'/class/codex-811/' },
{'title':'the Impossible Quiz 2','href':'/class/codex-812/' },
{'title':'the Little Giant','href':'/class/codex-813/' },
{'title':'the Spear Stickman','href':'/class/codex-814/' },
{'title':'the Speed Ninja','href':'/class/codex-815/' },
{'title':'There Is No Game','href':'/class/codex-816/' },
{'title':'Three Goblets','href':'/class/codex-817/' },
{'title':'Thumb Fighter','href':'/class/codex-818/' },
{'title':'Thumb Fighter Christmas','href':'/class/codex-819/' },
{'title':'Tictactoe','href':'/class/codex-820/' },
{'title':'Tiger Simulator 3d','href':'/class/codex-821/' },
{'title':'Tile Valley','href':'/class/codex-822/' },
{'title':'Timber Man','href':'/class/codex-823/' },
{'title':'Time Clones','href':'/class/codex-824/' },
{'title':'Time Shooter 2','href':'/class/codex-825/' },
{'title':'Time Shooter 3','href':'/class/codex-826/' },
{'title':'Time Shooter 3 Swat','href':'/class/codex-827/' },
{'title':'Tiny Cars','href':'/class/codex-828/' },
{'title':'Tiny Fishing','href':'/class/codex-829/' },
{'title':'Tiny Town Racing','href':'/class/codex-830/' },
{'title':'Tomb of the Mask','href':'/class/codex-831/' },
{'title':'Tomb of the Mask Color','href':'/class/codex-832/' },
{'title':'Tomb Runner','href':'/class/codex-833/' },
{'title':'Toon Off','href':'/class/codex-834/' },
{'title':'Top Speed 3d','href':'/class/codex-835/' },
{'title':'Top Speed Racing 3d','href':'/class/codex-836/' },
{'title':'Tower Crash 3d','href':'/class/codex-837/' },
{'title':'Tower Defense 2d','href':'/class/codex-838/' },
{'title':'Tower of Destiny','href':'/class/codex-839/' },
{'title':'Traffic Control','href':'/class/codex-840/' },
{'title':'Traffic Jam 3d','href':'/class/codex-841/' },
{'title':'Traffic Mania','href':'/class/codex-842/' },
{'title':'Traffic Rider','href':'/class/codex-843/' },
{'title':'Traffic Run','href':'/class/codex-844/' },
{'title':'Traffic Rush','href':'/class/codex-845/' },
{'title':'Traffic Tom','href':'/class/codex-846/' },
{'title':'Tribals Io','href':'/class/codex-847/' },
{'title':'Tricks','href':'/class/codex-848/' },
{'title':'Tricksplit Io','href':'/class/codex-849/' },
{'title':'Truck Traffic','href':'/class/codex-850/' },
{'title':'Truck Trials','href':'/class/codex-851/' },
{'title':'Tube Clicker','href':'/class/codex-852/' },
{'title':'Tube Jumpers','href':'/class/codex-853/' },
{'title':'Tunnel Rush','href':'/class/codex-854/' },
{'title':'Tunnel Rush 2','href':'/class/codex-855/' },
{'title':'Turbo Moto Racer','href':'/class/codex-856/' },
{'title':'Two Ball 3d','href':'/class/codex-857/' },
{'title':'Two Ball 3d Dark','href':'/class/codex-858/' },
{'title':'Two Neon Boxes','href':'/class/codex-859/' },
{'title':'Two Tunnel 3d','href':'/class/codex-860/' },
{'title':'Ultimate Car Arena','href':'/class/codex-861/' },
{'title':'Ultimate Car Driving','href':'/class/codex-862/' },
{'title':'Ultimate Off Road','href':'/class/codex-863/' },
{'title':'Ultimate Offroad Cars 2','href':'/class/codex-864/' },
{'title':'Unicycle Hero','href':'/class/codex-865/' },
{'title':'Uno','href':'/class/codex-866/' },
{'title':'Uno 4 Colors Multiplayer','href':'/class/codex-867/' },
{'title':'Venge Io','href':'/class/codex-868/' },
{'title':'Vex 3','href':'/class/codex-869/' },
{'title':'Vex 4','href':'/class/codex-870/' },
{'title':'Vex 5','href':'/class/codex-871/' },
{'title':'Vex 6','href':'/class/codex-872/' },
{'title':'Vex 7','href':'/class/codex-873/' },
{'title':'Vex 8','href':'/class/codex-874/' },
{'title':'Volley Random','href':'/class/codex-875/' },
{'title':'Volleyball Challenge','href':'/class/codex-876/' },
{'title':'Voxiom Io','href':'/class/codex-877/' },
{'title':'War Brokers Io','href':'/class/codex-878/' },
{'title':'War of Sticks','href':'/class/codex-879/' },
{'title':'Water Color Sort','href':'/class/codex-880/' },
{'title':'We Become What We Behold','href':'/class/codex-881/' },
{'title':'Wheelie Bike','href':'/class/codex-882/' },
{'title':'Wheely 2','href':'/class/codex-883/' },
{'title':'Wheely 3','href':'/class/codex-884/' },
{'title':'Wheely 4','href':'/class/codex-885/' },
{'title':'Wheely 5','href':'/class/codex-886/' },
{'title':'Wheely 6','href':'/class/codex-887/' },
{'title':'Wheely 7','href':'/class/codex-888/' },
{'title':'Wheely 8','href':'/class/codex-889/' },
{'title':'Where Is My Cat','href':'/class/codex-890/' },
{'title':'Who Is','href':'/class/codex-891/' },
{'title':'Wizard Mike','href':'/class/codex-892/' },
{'title':'Wood Blocks 3d','href':'/class/codex-893/' },
{'title':'Word City Crossed','href':'/class/codex-894/' },
{'title':'Word City Uncrossed','href':'/class/codex-895/' },
{'title':'Word Slide','href':'/class/codex-896/' },
{'title':'Wordle Infinite','href':'/class/codex-897/' },
{'title':'Wordle Plus','href':'/class/codex-898/' },
{'title':'Wordle Unlimited','href':'/class/codex-899/' },
{'title':'Words Search Classic Edition','href':'/class/codex-900/' },
{'title':'Worlds Hardest Game','href':'/class/codex-901/' },
{'title':'Worlds Hardest Game 2','href':'/class/codex-902/' },
{'title':'Worlds Hardest Game 3','href':'/class/codex-903/' },
{'title':'Wormate Io','href':'/class/codex-904/' },
{'title':'Wrassling','href':'/class/codex-905/' },
{'title':'Wrestle Bros Io','href':'/class/codex-906/' },
{'title':'X Trial Racing','href':'/class/codex-907/' },
{'title':'Yohoho Io','href':'/class/codex-908/' },
{'title':'Zeepkist Crash 2d','href':'/class/codex-909/' },
{'title':'Zombie Derby Pixel Survival','href':'/class/codex-910/' },
{'title':'Zombie Shooter 2d','href':'/class/codex-911/' },
{'title':'Zombocalypse Shooter','href':'/class/codex-912/' },
{'title':'Zombs Royale Io','href':'/class/codex-913/' },
{'title':'Zuck Vs Musk Techbro Beatdown','href':'/class/codex-914/' }
    ].map((item) => {
        const imageName = item.href.replace(/^\/class\//, '').replace(/\/$/, '');
        return {
            ...item,
            titleLower: item.title.toLowerCase(),
            img: `/assest/images/${imageName}@2x.webp`
        };
    });

    const topGames = games.slice(0, 35);

    const createElement = (tag, className, text) => {
        const el = document.createElement(tag);
        if (className) el.className = className;
        if (text !== undefined) el.textContent = text;
        return el;
    };

    const hideDropdown = () => {
        searchSuggestions.classList.add('hidden');
        searchSuggestions.innerHTML = '';
    };

    const renderDropdown = (query) => {
        const searchValue = query.trim().toLowerCase();
        const matches = searchValue ? games.filter((game) => game.titleLower.includes(searchValue)) : [];
        const items = matches.slice(0, 4);
        searchSuggestions.innerHTML = '';

        if (!searchValue) {
            hideDropdown();
            return;
        }

        if (!items.length) {
            const empty = createElement('div', 'search-dropdown-empty');
            const message = createElement('div', null, `No games found for “${query}”.`);
            const seeAllButton = createElement('button', 'search-dropdown-see-all', 'Show top games');
            seeAllButton.type = 'button';
            seeAllButton.addEventListener('click', () => submitSearch(query));
            empty.appendChild(message);
            empty.appendChild(seeAllButton);
            searchSuggestions.appendChild(empty);
            searchSuggestions.classList.remove('hidden');
            return;
        }

        items.forEach((game) => {
            const item = createElement('div', 'search-dropdown-item');
            const thumb = createElement('img', 'search-dropdown-thumb');
            thumb.src = game.img;
            thumb.alt = game.title;
            thumb.loading = 'lazy';
            const title = createElement('span', null, game.title);
            item.appendChild(thumb);
            item.appendChild(title);
            item.addEventListener('click', () => {
                window.location.href = game.href;
            });
            searchSuggestions.appendChild(item);
        });

        const seeAll = createElement('div', 'search-dropdown-see-all', `See all results for “${query}”`);
        seeAll.addEventListener('click', () => submitSearch(query));
        searchSuggestions.appendChild(seeAll);
        searchSuggestions.classList.remove('hidden');
    };

    const renderResults = (query) => {
        if (!searchResultsPage || !resultsTitle || !resultsNote || !resultsGrid) return;

        const searchValue = query.trim().toLowerCase();
        const matches = searchValue ? games.filter((game) => game.titleLower.includes(searchValue)) : [];
        const showGames = matches.length ? matches : topGames;

        resultsTitle.textContent = searchValue
            ? matches.length
                ? `Results for “${query}”`
                : `No results for “${query}”`
            : 'Top games';

        resultsNote.textContent = searchValue
            ? matches.length
                ? `Showing ${showGames.length} games that match your search.`
                : 'No direct matches were found, so we are showing our top 35 games instead.'
            : 'Browse our top 35 games.';

        resultsGrid.innerHTML = '';

        showGames.forEach((game) => {
            const card = createElement('a', 'search-result-card');
            card.href = game.href;
            const thumb = createElement('img', 'search-result-card-thumb');
            thumb.src = game.img;
            thumb.alt = game.title;
            const body = createElement('div', 'search-result-card-body', game.title);
            card.appendChild(thumb);
            card.appendChild(body);
            resultsGrid.appendChild(card);
        });
    };

    const hideSearchResults = () => {
        if (window.location.pathname.replace(/\/+$/, '') === '/search') return;
        if (searchResultsPage) {
            searchResultsPage.classList.remove('active');
        }
    };

    const searchReturnStorageKey = 'game-search-return-path';

    const getSearchReturnPath = () => {
        const currentUrl = new URL(window.location.href);
        const searchPath = currentUrl.pathname.replace(/\/+$/, '') === '/search';
        const candidates = searchPath
            ? [
                currentUrl.searchParams.get('from'),
                window.sessionStorage.getItem(searchReturnStorageKey),
                document.referrer
            ]
            : [`${currentUrl.pathname}${currentUrl.search}${currentUrl.hash}`];

        for (const candidate of candidates) {
            if (!candidate) continue;
            try {
                const returnUrl = new URL(candidate, currentUrl.origin);
                if (
                    returnUrl.origin !== currentUrl.origin ||
                    returnUrl.pathname.replace(/\/+$/, '') === '/search'
                ) {
                    continue;
                }
                return `${returnUrl.pathname}${returnUrl.search}${returnUrl.hash}`;
            } catch (error) {
                continue;
            }
        }
        return '/';
    };

    const submitSearch = (query) => {
        const trimmed = query.trim();
        if (!trimmed) {
            hideDropdown();
            return;
        }
        const returnPath = getSearchReturnPath();
        window.sessionStorage.setItem(searchReturnStorageKey, returnPath);
        const searchUrl = new URL('/search/', window.location.origin);
        searchUrl.searchParams.set('q', trimmed);
        searchUrl.searchParams.set('from', returnPath);
        window.location.href = `${searchUrl.pathname}${searchUrl.search}`;
    };

    if (resultsClose) {
        resultsClose.addEventListener('click', () => {
            let referrerUrl;
            try {
                referrerUrl = new URL(document.referrer);
            } catch (error) {
                referrerUrl = null;
            }

            if (
                referrerUrl &&
                referrerUrl.origin === window.location.origin &&
                referrerUrl.pathname.replace(/\/+$/, '') !== '/search' &&
                window.history.length > 1
            ) {
                window.history.back();
                return;
            }
            window.location.href = getSearchReturnPath();
        });
    }

    const openMobileSearch = () => {
        if (!mobileSearchPopup || !mobileSearchInput) return;
        mobileSearchPopup.classList.add('active');
        mobileSearchPopup.setAttribute('aria-hidden', 'false');
        mobileSearchInput.value = searchInput.value;
        mobileSearchInput.focus();
    };

    const closeMobileSearch = (options = { hideResults: true }) => {
        if (!mobileSearchPopup || !mobileSearchInput) return;
        mobileSearchPopup.classList.remove('active');
        mobileSearchPopup.setAttribute('aria-hidden', 'true');
        mobileSearchInput.value = '';
        if (options.hideResults) {
            hideSearchResults();
        }
    };

    if (mobileSearchButton) {
        mobileSearchButton.addEventListener('click', openMobileSearch);
    }

    if (mobileSearchClose) {
        mobileSearchClose.addEventListener('click', () => closeMobileSearch({ hideResults: true }));
    }

    if (mobileSearchPopup) {
        mobileSearchPopup.addEventListener('click', (event) => {
            if (event.target === mobileSearchPopup) {
                closeMobileSearch();
            }
        });
    }

    if (mobileSearchInput) {
        mobileSearchInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                submitSearch(mobileSearchInput.value);
                closeMobileSearch({ hideResults: false });
            }
            if (event.key === 'Escape') {
                closeMobileSearch();
            }
        });
    }

    if (mobileSearchForm) {
        mobileSearchForm.addEventListener('submit', (event) => {
            event.preventDefault();
            submitSearch(mobileSearchInput ? mobileSearchInput.value : '');
            closeMobileSearch({ hideResults: false });
        });
    }

    searchInput.addEventListener('input', (event) => {
        renderDropdown(event.target.value || '');
    });

    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            submitSearch(searchInput.value);
        }
        if (event.key === 'Escape') {
            hideDropdown();
            hideSearchResults();
        }
    });

    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        submitSearch(searchInput.value);
    });

    if (
        window.location.pathname.replace(/\/+$/, '') === '/search' &&
        searchResultsPage &&
        resultsTitle &&
        resultsNote &&
        resultsGrid
    ) {
        const query = new URLSearchParams(window.location.search).get('q') || '';
        searchInput.value = query;
        if (mobileSearchInput) {
            mobileSearchInput.value = query;
        }
        renderResults(query);
        searchResultsPage.classList.add('active');
    }

    document.addEventListener('click', (event) => {
        if (!searchForm.contains(event.target) && !searchSuggestions.contains(event.target)) {
            hideDropdown();
        }
    });
})();