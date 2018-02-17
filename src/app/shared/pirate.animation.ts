import { trigger, state, animate, transition, style, keyframes,AnimationEvent} from '@angular/animations';

export const pirateAnimation =
	trigger('inOut', [
		state( 'active', 
			style( { 
				transform:  'scale(1, 1)', 
				 'transform-origin':'50% 50%',
				opacity:1,
			})
		),
		state( 'inactive', 
			style( { transform:  'scale(0, 0)', opacity:0,  'transform-origin':'0% 50%', display:'none'})
		),
		transition('inactive => active', animate(200)),
		transition('active => inactive', animate(100))
	]
);